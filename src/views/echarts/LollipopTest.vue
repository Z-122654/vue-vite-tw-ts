<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

// Mock Data
const xData = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const dataEnergy = [200, 330, 250, 310, 210, 320, 260, 390, 320, 230, 350, 270]; // 上网电量
const dataPrice = [120, 150, 110, 130, 100, 140, 115, 170, 145, 110, 160, 130]; // 电价 (Scale scaled to right axis visually)

// Colors
const colorEnergy = '#5B8FF9'; // Blue-ish
const colorPrice = '#A368F2';  // Purple-ish

const option = {
  backgroundColor: '#0B1E3D',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'none' }, // Remove default axis pointer or use line
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: 'rgba(255,255,255,0.2)',
    textStyle: { color: '#fff' }
  },
  legend: {
    top: 20,
    right: 30,
    itemWidth: 14,
    itemHeight: 8,
    textStyle: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 14
    },
    data: ['上网电量', '电价']
  },
  grid: {
    top: 110, // Increased to separate from legend
    bottom: 60, // Increased bottom margin
    left: 60,
    right: 60
  },
  xAxis: {
    type: 'category',
    data: xData,
    axisTick: { show: false },
    axisLine: { show: false }, 
    axisLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
      margin: 20
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '上网电量万kWh',
      position: 'left',
      nameTextStyle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        padding: [0, 0, 10, 0],
        align: 'left'
      },
      splitLine: {
        show: false // Image shows vertical grid lines, horizontal splits are faint or none? Image has faint vertical lines.
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16
      },
      axisLine: { show: false }
    },
    {
      type: 'value',
      name: '电价',
      position: 'right',
      nameTextStyle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        padding: [0, 0, 10, 0],
        align: 'right'
      },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16
      },
      axisLine: { show: false }
    }
  ],
  // Use pictorialBar + bar to create the effect
  // We need multiple series for the "Lollipop" effect:
  // 1. Stem (Bar)
  // 2. Outer Halo (PictorialBar)
  // 3. Inner Dot (PictorialBar)
  series: [
    // --- Series 1: Energy (Blue) ---
    {
      name: '上网电量',
      type: 'bar',
      barWidth: 4,
      yAxisIndex: 0,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorEnergy }, // Top
          { offset: 1, color: 'rgba(91, 143, 249, 0)' } // Bottom Transparent
        ]),
        borderRadius: [2, 2, 0, 0]
      },
      data: dataEnergy,
      z: 1
    },
    // Outer Halo (Blue)
    {
      name: '上网电量', // Same name for legend grouping
      type: 'pictorialBar',
      symbol: 'circle',
      symbolSize: 24,
      symbolPosition: 'end',
      symbolOffset: [0, 0],
      yAxisIndex: 0,
      itemStyle: {
        color: 'transparent',
        borderColor: colorEnergy,
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: colorEnergy,
        opacity: 0.6
      },
      data: dataEnergy,
      z: 2
    },
    // Inner Dot (Blue)
    {
      name: '上网电量',
      type: 'pictorialBar',
      symbol: 'circle',
      symbolSize: 10,
      symbolPosition: 'end',
      symbolOffset: [0, 0],
      yAxisIndex: 0,
      itemStyle: {
        color: '#fff', // Or light blue
        borderWidth: 2,
        borderColor: colorEnergy,
        shadowBlur: 5,
        shadowColor: '#fff'
      },
      data: dataEnergy,
      z: 3
    },
    
    // --- Series 2: Price (Purple Line) ---
    {
      name: '电价',
      type: 'line',
      yAxisIndex: 1, // Right axis
      data: dataPrice,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: colorPrice,
        borderWidth: 2,
        borderColor: '#fff',
        shadowBlur: 5,
        shadowColor: colorPrice
      },
      lineStyle: {
        color: colorPrice,
        width: 2
      },
      smooth: false,
      z: 4
    }
  ]
};

// Add background vertical lines (Custom or separating lines)
// In the image, there are vertical lines behind each bar.
// We can use a separate bar series with max value and very low opacity for this.
const maxEnergy = 500; // Visible max
option.series.unshift({
  // Background vertical line
  type: 'bar',
  barWidth: 1,
  barGap: '-100%',
  itemStyle: {
    color: 'rgba(255,255,255,0.1)'
  },
  data: new Array(xData.length).fill(maxEnergy),
  animation: false,
  tooltip: { show: false },
  z: 0
} as any);


onMounted(() => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value);
    myChart.setOption(option);
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
