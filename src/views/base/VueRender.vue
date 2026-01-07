<script setup lang="ts">
import { ref } from 'vue'

const num1 = ref(0)
const num2 = ref({ number: 0 })

setInterval(() => {
  num1.value = Math.random()
}, 1000)
setInterval(() => {
  // 会导致render effect崩掉终止，之后该组件后续所有响应式更新都不会再触发 DOM 更新
  num2.value = null;
}, 1000)
</script>

<template>
  <div>{{ num1 }}</div>

  会导致render effect崩掉终止，之后该组件后续所有响应式更新都不会再触发 DOM 更新
  <div>{{ num2.num }}</div>
</template>

<style scoped>
div{
  width: 200px;
  height: 200px;
  background-color: #3fa7f5;
  font-size: 20px;
  font-weight: bolder;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 30px;
}
</style>