<template>
    <div class="ims-toggle-container">
        <div v-for="(item, index) in options" :key="item.value" class="ims-toggle-item" :class="[
            modelValue === item.value ? 'is-active' : 'is-inactive',
            itemClass
        ]" :style="{ marginLeft: index === 0 ? '0' : '-21px' }" @click="handleToggle(item.value)">
            <!-- 背景图层 -->
            <div class="toggle-bg" :style="{
                backgroundImage: `url(${getBgImage(modelValue === item.value)})`
            }"></div>

            <!-- 内容层 -->
            <span class="toggle-text">{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import selectedBg from '@/assets/img/ims/title-tab-selected-bg.png';
import unselectedBg from '@/assets/img/ims/title-tab-unselected-bg.png';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    options: {
        type: Array as PropType<Array<{ label: string; value: string | number }>>,
        default: () => []
    },
    // 允许外部微调每个item的尺寸样式
    itemClass: {
        type: String,
        default: '' // Remove tailwind defaults
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const handleToggle = (val: string | number) => {
    if (props.modelValue !== val) {
        emit('update:modelValue', val);
        emit('change', val);
    }
};

const getBgImage = (isActive: boolean) => {
    return isActive ? selectedBg : unselectedBg;
};
</script>

<style scoped>
.ims-toggle-container {
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

.ims-toggle-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    /* Default Dimensions if not overridden */
    width: 66px;
    height: 29.87px;
}

.toggle-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    z-index: 0;
}

.toggle-text {
    position: relative;
    z-index: 10;
    font-size: 16px;
    top: 2px;
    left: 2px;
}

/* Active State */
.ims-toggle-item.is-active {
    z-index: 10;
}

.ims-toggle-item.is-active .toggle-text {
    font-weight: 500;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(205, 228, 255, 1) 48%, rgba(149, 204, 255, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Inactive State */
.ims-toggle-item.is-inactive {
    z-index: 0;
}

.ims-toggle-item.is-inactive .toggle-text {
    font-weight: 300;
    color: rgba(0, 170, 255, 1);
}

.ims-toggle-item:not(.is-active):hover {
    filter: brightness(1.1);
}
</style>
