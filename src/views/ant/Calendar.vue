<script lang="ts" setup>
import { ref } from 'vue'
import { Dayjs } from 'dayjs'

const value = ref<Dayjs>()

const getListData = (value: Dayjs) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ]
      break
    default:
  }
  return listData || []
}

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394
  }
}
</script>

<template>
  <a-calendar v-model:value="value">
    <template #dateCellRender="{ current }">
      <div class="container">
        <div class="item"><span class="circle one"></span>一值</div>
        <div class="item"><span class="circle four"></span>四值</div>
        <div class="item"><span class="circle two"></span>二值</div>
        <div class="item"><span class="circle five"></span>五值</div>
        <div class="item"><span class="circle three"></span>三值</div>
        <div class="item"><span class="circle six"></span>六值</div>
      </div>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
</template>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列 */
  gap: 8px 40px; /* 行间距, 列间距 */
  font-size: 16px;
  width: max-content;
}

.item {
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 6px;
}

.one {
  background: #3fa7f5;
}

.two {
  background: #7aaef0;
}

.three {
  background: #7c00ff;
}

.four {
  background: #9fffff;
}

.five {
  background: #7bb031;
}

.six {
  background: #d6d6d6;
}
</style>