<template>
    <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

// Props
const props = withDefaults(defineProps<{
    data?: any[]; // Expecting structured data or just simple arrays
}>(), {
    data: () => []
});

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// Color Configuration based on the reference image
// Structure: [Top, SideStart, SideEnd, FrontStart, FrontEnd]
const colorThemes = {
    cyan: {
        top: '#2DF3FF',
        sideStart: 'rgba(0, 135, 150, 0.8)',
        sideEnd: 'rgba(0, 135, 150, 0.1)',
        frontStart: 'rgba(0, 180, 219, 0.8)',
        frontEnd: 'rgba(0, 131, 176, 0.1)'
    },
    blue: {
        top: '#5099FF',
        sideStart: 'rgba(26, 64, 153, 0.8)',
        sideEnd: 'rgba(26, 64, 153, 0.1)',
        frontStart: 'rgba(64, 128, 255, 0.8)',
        frontEnd: 'rgba(26, 80, 204, 0.1)'
    },
    orange: {
        top: '#FFD166',
        sideStart: 'rgba(153, 99, 0, 0.8)',
        sideEnd: 'rgba(153, 99, 0, 0.1)',
        frontStart: 'rgba(255, 187, 51, 0.8)',
        frontEnd: 'rgba(204, 136, 0, 0.1)'
    }
};

// Helper: Generate Cube Path
const renderCube = (params: any, api: any, typeIndex: 0 | 1 | 2) => {
    const location = api.coord([api.value(0), api.value(1)]);
    const xValue = api.value(0);
    const yValue = api.value(1);

    // Coordinate based layout
    // We need to offset bars so they stand side-by-side
    // Assume series index determines offset.
    // 3 series total.
    // center is location[0]. width is ~20px?

    const barWidth = 14;
    const gap = 2;
    const totalGroupWidth = (barWidth * 3) + (gap * 2);

    // Calculate specific x offset for this series
    // index 0 -> -offset, index 1 -> 0, index 2 -> +offset
    let xOffset = 0;
    if (typeIndex === 0) xOffset = -(barWidth + gap);
    if (typeIndex === 2) xOffset = (barWidth + gap);

    const x = location[0] + xOffset;
    const y = location[1];

    // Get base (y=0) coordinate
    const zeroPoint = api.coord([xValue, 0]);
    const yZero = zeroPoint[1];

    // Colors based on type index
    let theme = colorThemes.cyan;
    if (typeIndex === 1) theme = colorThemes.blue;
    if (typeIndex === 2) theme = colorThemes.orange;

    // Shapes
    // 1. Front Face (Rectangle)
    // 2. Right Face (Parallelogram/Trapezoid slant)
    // 3. Top Face (Rhombus/Parallelogram)

    // 2.5D Projection Constants
    const depthX = 6; // How much it goes right
    const depthY = -4; // How much it goes up (negative Y is up in canvas)

    const bodyLeft = x - barWidth / 2;
    const bodyRight = x + barWidth / 2;
    const bodyTop = y;
    const bodyBottom = yZero;

    // Vertices
    // Front Face
    const p1 = [bodyLeft, bodyTop]; // Top-Left
    const p2 = [bodyRight, bodyTop]; // Top-Right
    const p3 = [bodyRight, bodyBottom]; // Bottom-Right
    const p4 = [bodyLeft, bodyBottom]; // Bottom-Left

    // Back/Depth Face vertices (shifted)
    const p1_d = [p1[0] + depthX, p1[1] + depthY];
    const p2_d = [p2[0] + depthX, p2[1] + depthY];
    const p3_d = [p3[0] + depthX, p3[1] + depthY]; // Base depth usually aligned with bottom? 

    // But strictly 3D bars usually float the whole top.

    // Bottom of the Right Face:
    const pBottomRightDepth = [bodyRight + depthX, bodyBottom + depthY];

    return {
        type: 'group',
        children: [
            // Right Face (Side)
            {
                type: 'path',
                shape: {
                    d: [
                        ['M', p2[0], p2[1]],
                        ['L', p2_d[0], p2_d[1]],
                        ['L', pBottomRightDepth[0], pBottomRightDepth[1]], // Bottom back
                        ['L', p3[0], p3[1]],
                        ['Z']
                    ].map(cmd => cmd.join(' ')).join(' ')
                },
                style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: theme.sideStart },
                        { offset: 1, color: theme.sideEnd }
                    ])
                }
            },
            // Front Face (Main)
            {
                type: 'rect',
                shape: {
                    x: bodyLeft,
                    y: bodyTop,
                    width: barWidth,
                    height: bodyBottom - bodyTop
                },
                style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: theme.frontStart },
                        { offset: 1, color: theme.frontEnd }
                    ])
                }
            },
            // Top Face
            {
                type: 'path',
                shape: {
                    d: [
                        ['M', p1[0], p1[1]],
                        ['L', p1_d[0], p1_d[1]],
                        ['L', p2_d[0], p2_d[1]],
                        ['L', p2[0], p2[1]],
                        ['Z']
                    ].map(cmd => cmd.join(' ')).join(' ')
                },
                style: {
                    fill: theme.top
                }
            }
        ]
    };
};

// Dummy Data Generation
const generateData = () => {
    const xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
    const values1 = [18, 28, 32, 24, 26, 15, 27, 18, 28, 30]; // Cyan
    const values2 = [10, 19, 21, 15, 16, 9, 17, 10, 19, 20];  // Blue
    const values3 = [15, 25, 29, 20, 22, 12, 23, 15, 25, 28]; // Orange
    return { xData, values1, values2, values3 };
};

const initChart = () => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);

    const { xData, values1, values2, values3 } = generateData();

    const option = {
        backgroundColor: '#0B1E3D', // Deep navy background like image
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLine: { lineStyle: { color: '#304C70' } },
            axisTick: { show: false },
            axisLabel: {
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'PingFang SC'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            axisLabel: {
                color: '#FFFFFF',
                fontSize: 14
            }
        },
        series: [
            {
                name: 'Type A',
                type: 'custom',
                renderItem: (params: any, api: any) => renderCube(params, api, 0),
                data: values1
            },
            {
                name: 'Type B',
                type: 'custom',
                renderItem: (params: any, api: any) => renderCube(params, api, 1),
                data: values2
            },
            {
                name: 'Type C',
                type: 'custom',
                renderItem: (params: any, api: any) => renderCube(params, api, 2),
                data: values3
            }
        ]
    };

    chartInstance.setOption(option);
};

onMounted(() => {
    initChart();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance?.dispose();
});

const handleResize = () => {
    chartInstance?.resize();
};
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>
