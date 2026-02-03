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

// 每个系列的主色（接近你截图的配色）
const colorMap = {
  '国华人防': ['#0263E0', '#0263E0'],
  '益安人防': ['#01C759', '#01C759'],
  '纤博新材料': ['#DF2D4F', '#DF2D4F'],
  '山鹰纸业': ['#84e0fb', '#84e0fb'],
  '鲜活果汁': ['#C48301', '#C48301'],
  '逸舒制药': ['#E13AC0', '#E13AC0'],
} as Record<string, string[]>

// 柱宽配置
const BAR_W = 40

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
  const stackDataMap: Record<string, { start: number, end: number }[]> = {}
  
  // 1. Calculate stack start/end based on the PASSED data (crucial for zero-state animation)
  let tempStackValues = new Array(xData.length).fill(0)
  seriesKeys.forEach(key => {
    const data = currentDataMap[key]
    stackDataMap[key] = data.map((val, idx) => {
      const start = tempStackValues[idx]
      const end = start + val
      tempStackValues[idx] = end
      return { start, end }
    })
  })

  // 2. Generate series objects
  const seriesList: any[] = []

  seriesKeys.forEach(name => {
    const colors = colorMap[name];
    if (!colors) return;
    const [cTop] = colors;
    
    // Use the passed data, not the global one
    const originalData = currentDataMap[name];
    const stackInfo = stackDataMap[name];

    // Colors for gradients
    const leftTopColor = hexToRgba(cTop, 0.6)
    const leftBottomColor = hexToRgba(cTop, 0.2)
    const rightTopColor = hexToRgba(cTop, 1)
    const rightBottomColor = hexToRgba(cTop, 0.2)

    // Custom series data: [index, value, start, end]
    const customData = originalData.map((val, idx) => {
      return [idx, val, stackInfo[idx].start, stackInfo[idx].end]
    })

    seriesList.push(
      // 1. 顶部盖子 (菱形)
      {
        name,
        type: 'pictorialBar',
        symbol: 'diamond',
        symbolSize: (data: number, params: any) => {
          // Check REAL data value so cap is full size even during zero-animation
          const realVal = dataMap[name][params.dataIndex];
          return realVal > 0 ? [BAR_W, 20] : [0, 0]
        },
        symbolOffset: [0, -10],
        symbolPosition: 'end',
        // Manual stacking data implies we use the 'end' value as data for positioning
        data: stackInfo.map(item => item.end), 
        itemStyle: {
          color: hexToRgba(cTop, 1),
          shadowBlur: 5,
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        z: 3,
        tooltip: { show: false },
      },
      // 2. 柱体 (自定义 3D 棱镜)
      {
        name,
        type: 'custom',
        renderItem: (params: any, api: any) => {
          // Coordinates
          const startPt = api.coord([api.value(0), api.value(2)])
          const endPt = api.coord([api.value(0), api.value(3)])
          
          const x = startPt[0]
          const yBottom = startPt[1]
          const yTop = endPt[1]
          
          const halfWidth = BAR_W / 2

          // Left Face Path
          const leftPath = [
            [x, yBottom], // Bottom Center
            [x - halfWidth, yBottom], // Bottom Left
            [x - halfWidth, yTop], // Top Left
            [x, yTop] // Top Center
          ]

          // Right Face Path
          const rightPath = [
            [x, yBottom], // Bottom Center
            [x, yTop], // Top Center
            [x + halfWidth, yTop], // Top Right
            [x + halfWidth, yBottom] // Bottom Right
          ]
          
          return {
            type: 'group',
            children: [
              // Left Face
              {
                type: 'polygon',
                shape: { points: leftPath },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: leftTopColor },
                    { offset: 1, color: leftBottomColor }
                  ])
                },
                // 关键：添加 transition 属性，告诉 ECharts 这些形状属性需要动画
                transition: ['shape', 'style']
              },
              // Right Face
              {
                type: 'polygon',
                shape: { points: rightPath },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: rightTopColor },
                    { offset: 1, color: rightBottomColor }
                  ])
                },
                transition: ['shape', 'style']
              }
            ]
          }
        },
        data: customData,
        z: 2
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
  series: [], // Initial state empty, populated in onMounted
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
    
    // 3. 稍后渲染真实数据，利用 ECharts 的 update 动画实现“生长”效果
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
