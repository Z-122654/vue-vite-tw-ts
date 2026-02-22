<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <button type="button" @click="goHome">
      返回首页
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style lang="sass" scoped>
.not-found
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 12px
  color: #1f2937

  h1
    font-size: 56px
    margin: 0

  p
    margin: 0
    font-size: 16px

  button
    border: none
    border-radius: 10px
    padding: 8px 16px
    cursor: pointer
    background: #111827
    color: #ffffff
</style>
