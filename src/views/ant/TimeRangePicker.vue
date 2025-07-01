<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dayjs } from 'dayjs'

const timeRange = ref<Dayjs>()
const timeRangeFmt = ref<string[]>()

watch(timeRange, (value) => {
  if (value && value.length === 2) {
    timeRangeFmt.value = value.map(t => t.format('HH:mm'))
  } else {
    timeRangeFmt.value = []
  }
})
</script>

<template>
  <a-time-range-picker v-model:value="timeRange" format="hh:mm" />
  <div>{{ timeRangeFmt }}</div>
</template>

<style scoped lang="sass">

</style>