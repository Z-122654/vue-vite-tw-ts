<template>
  <div class="chart-wrapper">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const data = [175, 135, 225, 188, 153, 215];
const xData = ['1月', '2月', '3月', '4月', '5月', '6月'];

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    backgroundColor: '#0b1c3a',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: { left: 60, right: 60, top: 40, bottom: 50 },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,.25)' } },
      axisLabel: { color: 'rgba(255,255,255,.7)', fontSize: 14 }
    },
    yAxis: {
      type: 'value',
      max: 300, // 显式设定最大值，避免比例缩放过小
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,.12)' } },
      axisLabel: { color: 'rgba(255,255,255,.6)', fontSize: 14 }
    },
    series: [
      {
        type: 'custom',
        name: '数值',
        // 使用显式的二维数组数据结构
        data: data.map((item, index) => [index, item]),
        encode: {
          x: 0,
          y: 1
        },
        renderItem: (params: any, api: any) => {
          const val = api.value(1); // 获取 Y 轴数值
          const idx = api.value(0); // 获取 X 轴索引

          // 类目中心点（x）+ 数值对应坐标（y）
          const coord = api.coord([idx, val]);
          const x = coord[0];
          const yTop = coord[1];
          const yBottom = api.coord([idx, 0])[1];

          const wBottom = 48;
          const wTop = 32;
          const depth = 20;
          const capH = 12;

          // 计算正面四个角点（梯形）
          const leftBottom = [x - wBottom / 2, yBottom];
          const rightBottom = [x + wBottom / 2, yBottom];
          const leftTop = [x - wTop / 2, yTop];
          const rightTop = [x + wTop / 2, yTop];

          // 顶盖的“斜向偏移”（产生 3D 效果的关键）
          const shiftX = depth;
          const shiftY = -capH;

          return {
            type: 'group',
            children: [
              // 1. 柱体正面 (Main Face)
              {
                type: 'polygon',
                shape: { points: [leftBottom, rightBottom, rightTop, leftTop] },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(35, 92, 255, 0.95)' },
                    { offset: 1, color: 'rgba(86, 198, 255, 0.4)' }
                  ])
                }
              },
              // 2. 右侧面 (Right Side)
              {
                type: 'polygon',
                shape: {
                  points: [
                    rightBottom,
                    [rightBottom[0] + shiftX, rightBottom[1] + shiftY],
                    [rightTop[0] + shiftX, rightTop[1] + shiftY],
                    rightTop
                  ]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(20, 60, 200, 0.9)' },
                    { offset: 1, color: 'rgba(20, 60, 200, 0.3)' }
                  ])
                }
              },
              // 3. 顶面 (Top Face)
              {
                type: 'polygon',
                shape: {
                  points: [
                    leftTop,
                    rightTop,
                    [rightTop[0] + shiftX, rightTop[1] + shiftY],
                    [leftTop[0] + shiftX, leftTop[1] + shiftY]
                  ]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: 'rgba(140, 240, 255, 1)' },
                    { offset: 1, color: 'rgba(40, 120, 255, 1)' }
                  ])
                }
              },
              // 4. 装饰：顶部高光中心点
              {
                type: 'circle',
                shape: {
                  cx: x + shiftX * 0.5,
                  cy: yTop + shiftY * 0.5,
                  r: 3
                },
                style: {
                  fill: '#fff',
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 220, 255, 0.8)'
                }
              },
              // 5. 装饰：底部光斑
              {
                type: 'circle',
                shape: { cx: x, cy: yBottom, r: 5 },
                style: {
                  fill: 'rgba(140, 240, 255, 0.4)',
                  shadowBlur: 15,
                  shadowColor: 'rgba(80, 180, 255, 0.6)'
                }
              }
            ]
          };
        }
      }]
  };

  chartInstance.setOption(option);
};

const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100vh;
  background: #0b1c3a;
  padding: 20px;
  box-sizing: border-box;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>