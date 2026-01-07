<script setup lang="ts">
import { ref } from 'vue'

const initialIndex = 0;
const currentSlide = ref(0); // 根据 type 参数设置初始值

// Carousel change事件
const handleCarouselChange = (current: number) => {
  currentSlide.value = current;
};

const testNum = ref(0);
setInterval(() => {
  testNum.value++;
}, 1000);
</script>

<template>
  <a-carousel
    ref="carouselRef"
    :autoplay="false"
    :initialSlide="initialIndex"
    @afterChange="handleCarouselChange"
  >
    <!-- 生产数据大屏 -->
    <div>
      <div  class="carousel-slide"  style="background-color: rebeccapurple;">
        AAA
      </div>
    </div>

    <!-- 燃料数据大屏 -->
    <div>
      <div class="carousel-slide" style="background-color: #3fa7f5;">
        BBB
        <span>{{testNum}}</span>
      </div>
    </div>
  </a-carousel>
</template>

<style scoped>

.carousel-slide {
  width: 100vw;
  height: 100vh;
}
</style>