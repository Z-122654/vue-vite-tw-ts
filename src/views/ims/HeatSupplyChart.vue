<template>
    <div class="chart-wrapper">
        <div class="chart-header">
            <span class="unit">供热量：吨</span>
        </div>
        <div ref="chartRef" class="chart-container"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 模拟数据 (10月1日 - 10月31日)
const xData = Array.from({ length: 31 }, (_, i) => `10.${i + 1}`);
const barData = [
    130, 115, 132, 118, 155, 122, 135, 125, 140, 130,
    145, 110, 128, 150, 160, 140, 135, 120, 115, 130,
    142, 155, 138, 125, 118, 132, 145, 150, 140, 135, 128
];
const lineData = [
    135, 115, 135, 120, 158, 122, 135, 128, 142, 135,
    148, 115, 132, 155, 165, 145, 140, 125, 120, 135,
    148, 160, 142, 130, 125, 138, 150, 155, 145, 140, 132
];
const midData = [
    45, 42, 48, 40, 52, 44, 46, 43, 49, 45,
    50, 41, 44, 52, 55, 48, 46, 42, 41, 45,
    48, 52, 47, 43, 41, 45, 49, 52, 48, 46, 44
];
const gasData = [
    85, 82, 88, 80, 92, 84, 86, 83, 89, 85,
    90, 81, 84, 92, 95, 88, 86, 82, 81, 85,
    88, 92, 87, 83, 81, 85, 89, 92, 88, 86, 84
];

const initChart = () => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(23, 49, 102, 0.9)',
            borderColor: '#2453a5',
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            formatter: (params: any) => {
                const p = Array.isArray(params) ? params : [params];
                let dateVal = p[0].axisValue;
                if (dateVal.includes('.')) {
                    const parts = dateVal.split('.');
                    dateVal = `10月${parts[1]}日`;
                }

                let res = `<div style="padding: 10px; border-radius: 4px; background: rgba(14, 29, 64, 0.95); border: 1px solid #2453a5;">
                    <div style="margin-bottom: 12px; font-weight: bold; font-size: 16px; color: #fff;">${dateVal}</div>`;

                // 配置要显示的指标（包含图表未渲染的指标）
                const targets = [
                    { name: '低压供热热工热量', color: '#8e79ff', value: (idx: number) => lineData[idx] },
                    { name: '全厂供热量日累计', color: '#3494e6', value: (idx: number) => barData[idx] },
                    { name: '中压供热量', color: '#B52828', value: (idx: number) => midData[idx] },
                    { name: '燃机供热量', color: '#B59628', value: (idx: number) => gasData[idx] }
                ];

                const dataIndex = p[0].dataIndex;
                targets.forEach(target => {
                    const val = target.value(dataIndex);
                    res += `<div style="display: flex; align-items: center; justify-content: space-between; gap: 40px; margin-bottom: 8px;">
                      <span style="display: flex; align-items: center; color: rgba(255,255,255,0.9); font-size: 14px;">
                        <span style="display: inline-block; width: 8px; height: 8px; background: ${target.color}; margin-right: 8px;"></span>
                        ${target.name}
                      </span>
                      <span style="color: ${target.color}; font-weight: bold; font-family: DIN Alternate, sans-serif; font-size: 16px;">
                        ${Number(val).toLocaleString()}吨
                      </span>
                    </div>`;
                });
                res += '</div>';
                return res;
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    type: 'dashed'
                }
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLine: {
                lineStyle: {
                    color: '#304C70'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#909399',
                fontSize: 14,
                margin: 15,
                interval: 'auto' // 自动过滤重叠标签
            }
        },
        yAxis: {
            type: 'value',
            interval: 36,
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisLabel: {
                color: '#909399',
                fontSize: 18
            }
        },
        series: [
            {
                name: '全厂供热量日累计',
                type: 'pictorialBar',
                symbol: 'rect',
                symbolRepeat: true,
                symbolClip: true, // 核心修复：必须开启裁剪，否则虚线会填满整个容器高度
                symbolMargin: 2,
                symbolSize: [12, 4],
                itemStyle: {
                    color: '#3494e6'
                },
                data: barData,
                z: 1
            },
            {
                name: '低压供热热工热量',
                type: 'line',
                data: lineData,
                smooth: false,
                symbol: 'rect',
                symbolSize: 10,
                itemStyle: {
                    color: '#fff',
                    borderColor: '#8e79ff',
                    borderWidth: 2,
                    shadowBlur: 5,
                    shadowColor: '#8e79ff'
                },
                lineStyle: {
                    color: '#8e79ff',
                    width: 2
                },
                z: 10
            }
        ]
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
    height: 100%;
    background: #060c18;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.chart-header {
    margin-bottom: 10px;
}

.unit {
    color: #909399;
    font-size: 14px;
}

.chart-container {
    flex: 1;
    width: 100%;
    min-height: 300px;
}
</style>
