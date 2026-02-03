<template>
    <div class="w-full h-full min-h-screen bg-gray-900 flex flex-col items-center justify-center space-y-10 p-10">
        <h1 class="text-white text-2xl font-bold mb-5">ImsToggle 组件测试</h1>

        <!-- 默认尺寸测试 -->
        <div class="flex flex-col items-center space-y-4">
            <h2 class="text-blue-300">默认尺寸 (日/月)</h2>
            <ImsTitleToggleLeft v-model="currentMergeType" :options="options" @change="handleChange" />
            <p class="text-white">当前选中: {{ currentMergeType }}</p>
        </div>

        <!-- 自定义尺寸测试 (模拟更大或更小的场景) -->
        <div class="flex flex-col items-center space-y-4">
            <h2 class="text-blue-300">自定义大尺寸</h2>
            <ImsContentToggleLeft v-model="currentType2" :options="options2" item-class="w-[160px] h-[60px] text-2xl" />
            <p class="text-white">当前选中: {{ currentType2 }}</p>
        </div>

        <!-- 供热量图表测试 -->
        <div class="w-full flex flex-col items-center space-y-4">
            <h2 class="text-blue-300">供热量图表</h2>
            <div style="width: 800px; height: 500px; border: 1px solid #304C70;">
                <HeatSupplyChart />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImsTitleToggleLeft from './ImsTitleToggleLeft.vue';
import HeatSupplyChart from './HeatSupplyChart.vue';
import ImsContentToggleLeft from '@/views/ims/ImsContentToggleLeft.vue'

const currentMergeType = ref('day');
const options = [
    { label: '日', value: 'day' },
    { label: '月', value: 'month' },
    { label: '年', value: 'year' }
];

const currentType2 = ref('jizu1');
const options2 = [
    { label: '#1机组', value: 'jizu1' },
    { label: '#2机组', value: 'jizu2' },
    { label: '3套机组', value: 'jizu3' },
    { label: '4套机组', value: 'jizu4' }
];

const handleChange = (val: string | number) => {
    console.log('Toggle changed to:', val);
};
</script>
