<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

const xData = ['9.1日', '9.2日', '9.3日', '9.4日', '9.5日', '9.6日']

// 你按实际数据替换这里（每个数组长度 = xData.length）
const dataMap = {
  '国华人防': [280, 200, 380, 110, 240, 280],
  '益安人防': [0, 0, 0, 60, 30, 70],
  '纤博新材料': [0, 0, 0, 40, 60, 0],
  '山鹰纸业': [60, 50, 70, 40, 60, 50],
  '鲜活果汁': [0, 0, 0, 0, 70, 50],
  '逸舒制药': [0, 0, 0, 0, 50, 0],
} as Record<string, number[]>

// 每个系列的主色
const colorMap = {
  '国华人防': ['#0263E0', '#0263E0'],
  '益安人防': ['#01C759', '#01C759'],
  '纤博新材料': ['#DF2D4F', '#DF2D4F'],
  '山鹰纸业': ['#84e0fb', '#84e0fb'],
  '鲜活果汁': ['#C48301', '#C48301'],
  '逸舒制药': ['#E13AC0', '#E13AC0'],
} as Record<string, string[]>

// 柱宽和“椭圆盖子”大小要匹配
const BAR_W = 40
const CAP_H = 16

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number) {
  let r = 0, g = 0, b = 0;
  // Handle 3-char hex
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

// 封装系列生成逻辑，支持传入特定数据以实现动画
function generateSeries(currentDataMap: Record<string, number[]>) {
  const seriesKeys = Object.keys(currentDataMap)
  const topDataMap: Record<string, number[]> = {}
  
  // 1. Calculate stack sum based on the PASSED data
  let currentStackValues = new Array(xData.length).fill(0)
  seriesKeys.forEach(key => {
    const data = currentDataMap[key]
    topDataMap[key] = data.map((val, idx) => {
      currentStackValues[idx] += val
      return currentStackValues[idx]
    })
  })

  // 2. Generate series objects
  const seriesList: any[] = []

  seriesKeys.forEach(name => {
    const colors = colorMap[name];
    if (!colors) return;
    const [cTop] = colors;
    
    const originalData = currentDataMap[name];
    const stackedData = topDataMap[name]; // Use calculated stack tops
    
    // 圆柱体垂直渐变透明效果
    const barColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: hexToRgba(cTop, 1.0) },
      { offset: 1, color: hexToRgba(cTop, 0.2) },
    ])

    seriesList.push(
       // 顶部圆 (不参与堆叠，使用绝对定位值)
      {
        name,
        type: 'pictorialBar',
        symbol: 'circle',
        symbolSize: (data: number, params: any) => {
          // Check REAL data value so cap is full size even during zero-animation
          const realVal = dataMap[name][params.dataIndex];
          return realVal > 0 ? [BAR_W, CAP_H] : [0, 0]
        },
        symbolOffset: [0, -8], // 向上偏移半径的一半，正好盖住柱顶
        symbolPosition: 'end',
        data: stackedData, // 使用计算好的绝对高度
        itemStyle: {
          color: cTop, // 顶部使用不透明纯色
          shadowBlur: 5,
          shadowColor: 'rgba(255, 255, 255, 0.3)', // 加一点光晕
        },
        z: 3,
        tooltip: { show: false },
      },
      // 柱体 (参与自动堆叠)
      {
        name,
        type: 'bar',
        stack: 'total', // 只有 bar 参与堆叠
        barWidth: BAR_W,
        data: originalData,
        itemStyle: {
          color: barColor,
          // opacity: 1, // 控制整体透明度，这里由 gradient 控制
        },
      }
    )
  })

  return seriesList
}

const option = {
  backgroundColor: '#0B1E3D',
  legend: {
    top: 14,
    icon: 'rect',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  },
  grid: { left: 70, right: 30, top: 90, bottom: 50 },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    textStyle: { color: '#fff' },
  },
  xAxis: {
    type: 'category',
    data: xData,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.25)' } },
    axisLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 16 },
  },
  yAxis: {
    type: 'value',
    name: '单位',
    nameTextStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 18, padding: [0, 0, 10, 0] },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 18 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.10)', width: 2 } },
  },
  series: [], // Initial state empty
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'cubicOut',
}

onMounted(() => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value);
    
    // 1. 生成全 0 数据
    const zeroDataMap: Record<string, number[]> = {}
    Object.keys(dataMap).forEach(key => {
      zeroDataMap[key] = new Array(xData.length).fill(0)
    })

    // 2. 首先渲染 0 状态
    const zeroSeries = generateSeries(zeroDataMap)
    myChart.setOption({
      ...option,
      series: zeroSeries
    });
    
    // 3. 稍后渲染真实数据
    setTimeout(() => {
      const realSeries = generateSeries(dataMap)
      myChart?.setOption({
        series: realSeries
      })
    }, 100)
    
    window.addEventListener('resize', resizeChart);
  }
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
  window.removeEventListener('resize', resizeChart);
});

function resizeChart() {
  myChart?.resize();
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100vh;
  min-height: 600px;
}
</style>
