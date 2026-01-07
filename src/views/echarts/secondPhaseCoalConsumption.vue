<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const option = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '20px',
    right: '20px',
    top: '200px',
    bottom: '30px',
    containLabel: true
  },
  legend: {
    show: false
  },
  color: ['rgba(36, 107, 253, 1)'],

  xAxis: {
    type: 'time',

    offset: 10,
    axisLabel: {
      color: 'rgba(255,255,255,0.85)',
      formatter: function(value) {
        const date = new Date(value)
        const m = date.getMonth() + 1
        const d = date.getDate()
        return `${m}.${d}`
      }
    },
    axisLine: { lineStyle: { color: 'red' } },
    axisTick: { show: false },
    min: (v) => v.min - 24 * 60 * 60 * 1000 * 0.2,
    max: (v) => v.max + 24 * 60 * 60 * 1000 * 0.2
  },
  yAxis: [
    {
      type: 'value',
      name: '近七日',
      min: 0,
      interval: 50,
      axisLabel: {
        formatter: '{value}',
        color: 'rgba(255,255,255,0.5)'
      },
      nameTextStyle: { color: 'rgba(255,255,255,0.5)' },
      axisLine: {
        show: true,
        lineStyle: { color: 'rgba(255,255,255,0.3)' }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      }
    }
  ],
  series: [
    {
      name: '总煤量',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      areaStyle: {
        opacity: 0.45,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(36,107,253,0.45)' },
          { offset: 1, color: 'rgba(36,107,253,0)' }
        ])
      },
      lineStyle: {
        width: 3
      },
      tooltip: {
        valueFormatter: (value) => value
      },
      data: [
        ['2025-08-01', 50],
        ['2025-08-02', 80],
        ['2025-08-03', 133],
        ['2025-08-04', 145],
        ['2025-08-05', 163],
        ['2025-08-06', 102],
        ['2025-08-07', 123]
      ]
    }
  ]
})

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(option)

    // 响应式调整
    window.addEventListener('resize', () => {
      chartInstance?.resize()
    })
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})
</script>

<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">二期近七日煤量消耗</h3>
    <div ref="chartRef" class="echarts-container"></div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.chart-title {
  color: white;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

.echarts-container {
  width: 100%;
  height: 400px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
</style>