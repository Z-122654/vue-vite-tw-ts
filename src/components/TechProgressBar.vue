<template>
    <div class="progress-wrapper">
        <!-- Blueprint/Track Border -->
        <div class="progress-track" :style="trackStyle">
            <!-- Filled Bar -->
            <div class="progress-fill" :style="fillStyle">
                <!-- Tip Marker (The lighter block at the end) -->
                <div class="progress-tip" :style="tipStyle"></div>
            </div>
        </div>

        <!-- Percentage Text -->
        <div class="progress-text">
            {{ displayedValue }}<span class="unit">%</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

const props = withDefaults(defineProps<{
    type?: 'normal' | 'warning';
    value?: number;
}>(), {
    type: 'normal',
    value: 0
});

// Color definitions
const colors = {
    normal: {
        base: '0, 145, 255',
        hex: '#0091FF'
    },
    warning: {
        base: '249, 179, 79',
        hex: '#F9B34F'
    }
};

// Layout & Animation Logic
const duration = 1500;
const rawValue = ref(0);

// Style Computations
const activeColor = computed(() => colors[props.type] || colors.normal);

const trackStyle = computed(() => ({
    border: `0.5px solid rgba(${activeColor.value.base}, 1)`,
    boxShadow: `0 0 4px rgba(${activeColor.value.base}, 0.3)`
}));

const fillStyle = computed(() => ({
    width: `${rawValue.value}%`, // Animation connects here
    background: `rgba(${activeColor.value.base}, 0.3)`
}));

const tipStyle = computed(() => ({
    backgroundColor: `rgba(${activeColor.value.base}, 1)`,
    boxShadow: `0 0 15px rgba(${activeColor.value.base}, 0.8)`
}));

// Display Logic
const displayedValue = computed(() => {
    return rawValue.value.toFixed(2);
});

// Animation
const animateValues = (target: number) => {
    const startTime = performance.now();
    const start = rawValue.value; // Resume from current

    const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        const current = start + (target - start) * ease;
        rawValue.value = current;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            rawValue.value = target;
        }
    };
    requestAnimationFrame(step);
};

// Watch for value changes and animate
watch(() => props.value, (newVal) => {
    animateValues(newVal);
});

onMounted(() => {
    // Initial animation
    setTimeout(() => {
        animateValues(props.value);
    }, 300);
});
</script>

<style scoped>
.progress-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.progress-track {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    /* width is now controlled by parent or flexible */
    width: 145px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0);
    overflow: hidden;
}

.progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    /* transition: width handled by JS animation now to sync with text? 
     Actually keeping CSS transition for smoothness is good but mixing with JS number updates can be tricky.
     Since we update width via style binding from rawValue (which is animated), we don't need CSS transition on width.
  */
    overflow: hidden;
}

.progress-tip {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 2;
}

.progress-text {
    font-family: 'DIN Alternate', sans-serif;
    color: #FFFFFF;
    line-height: 1;
    min-width: 60px;
    /* Adjusted from 180px which was too wide for small component */
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    font-size: 16px;
    text-align: right;
    margin-left: 10px;
}

.unit {
    color: #FFFFFF;
    margin-left: 2px;
    font-family: 'DIN Alternate';
    font-weight: 700;
    font-size: 16px;
    text-align: right;
}
</style>
