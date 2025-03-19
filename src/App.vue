<template>
  <router-view />
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'
import { computed, provide, ref, watchEffect } from 'vue'

const darkStore = localStorage.getItem('dark')
const prefersDark: boolean = darkStore
  ? darkStore === 'true'
  : window.matchMedia('(prefers-color-scheme: dark)').matches

const mode = ref<boolean>(prefersDark)
const theme = computed(() => (mode.value ? darkTheme : lightTheme))

watchEffect(() => {
  localStorage.setItem('dark', `${mode.value}`)
})

const collapsed = ref(true)

provide('pinia', 'Pinia与provide的测试')
</script>

<style lang="sass">
#app
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

html
  background-color: #f5f5f5
</style>
