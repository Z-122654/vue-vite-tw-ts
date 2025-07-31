<template>
  <a-timeline mode="left">
    <a-timeline-item
      v-for="(item, index) in records"
      :key="index"
      :color="itemColor(item.type)"
    >
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <div>{{ item.time }}</div>
          <div :style="{ color: typeColor(item.type), marginTop: '4px' }">{{ item.type }}</div>
        </div>

        <div style="text-align: right; flex-grow: 1; margin-left: 20px">
          <!-- 离岗时间 -->
          <div v-if="item.duration">
            离岗时长：
            <span style="color: red">{{ item.duration }}</span> min
          </div>

          <!-- 领导指派 -->
          <div style="margin-top: 4px">
            <a-checkbox v-model:checked="item.assigned">领导指派</a-checkbox>
          </div>
        </div>
      </div>
    </a-timeline-item>
  </a-timeline>
</template>

<script setup>
import { reactive } from 'vue'

const records = reactive([
  {
    time: '2025-05-28 16:27',
    type: '进岗',
    assigned: false
  },
  {
    time: '2025-05-28 18:00',
    type: '出岗',
    duration: 155,
    assigned: false
  },
  {
    time: '2025-05-28 20:35',
    type: '进岗',
    assigned: false
  },
  {
    time: '2025-05-28 21:00',
    type: '早退',
    duration: 270,
    assigned: false
  },
  {
    time: '2025-05-28 21:00',
    type: '外派',
    assigned: true
  }
])

const itemColor = (type) => {
  if (type === '出岗' || type === '早退') return 'red'
  return 'green'
}

const typeColor = (type) => {
  if (type === '出岗' || type === '早退') return 'red'
  return 'green'
}
</script>

<style scoped>
a-checkbox {
  margin-left: 8px;
}
</style>
