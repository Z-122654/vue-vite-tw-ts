<template>
  <div class="container">
    <div class="demo-wrapper">
      <h2>Normal Type (Default)</h2>
      <TechProgressBar :value="45.87" />

      <h2 class="mt-8">Warning Type</h2>
      <TechProgressBar type="warning" :value="88.50" />

      <h2 class="mt-8">Animate Input</h2>
      <!-- Simple input to test reactivity -->
      <div class="controls">
        <input type="range" v-model.number="testVal" min="0" max="100" />
      </div>
      <TechProgressBar type="normal" :value="testVal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TechProgressBar from '@/components/TechProgressBar.vue';

const testVal = ref(20);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #0B1E3D;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.demo-wrapper {
  width: 80%;
  max-width: 400px;
}

h2 {
  color: white;
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.mt-8 {
  margin-top: 32px;
}

.controls {
  margin-bottom: 10px;
}
</style>
