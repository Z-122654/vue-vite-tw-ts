<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dayjs } from 'dayjs'

const timeRange = ref(['02:02', '08:06'])

const handleChange = (value) => {
  debugger
}
const handleBlur = () => {
  debugger
}
</script>

<template>
  <a-time-range-picker @change="handleChange" @blur="handleBlur" v-model:value="timeRange" format="hh:mm"
                       valueFormat="hh:mm" mode="combobox"/>
  <div>{{ timeRange }}</div>
</template>

<style scoped lang="sass">

</style>