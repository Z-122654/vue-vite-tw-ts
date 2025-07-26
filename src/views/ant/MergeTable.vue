<template>
  <a-table
    :columns="mergedColumns"
    :data-source="data"
    bordered
    :pagination="false"
    row-key="key"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const data = ref([
  { key: 1, category: '水果', product: '苹果', qty: 5 },
  { key: 2, category: '水果', product: '香蕉', qty: 8 },
  { key: 3, category: '水果', product: '橙子', qty: 3 },
  { key: 4, category: '饮料', product: '可乐', qty: 6 },
  { key: 5, category: '饮料', product: '雪碧', qty: 7 },
  { key: 6, category: '零食', product: '薯片', qty: 10 },
])

// 预计算 rowSpan
const rowSpans = computed(() => {
  const spans = new Array(data.value.length).fill(1)
  let lastCategory = null
  let startIndex = 0
  let count = 0

  data.value.forEach((item, idx) => {
    if (item.category !== lastCategory) {
      // 上一段合并
      if (count > 0) {
        spans[startIndex] = count
        for (let i = startIndex + 1; i < idx; i++) {
          spans[i] = 0
        }
      }
      lastCategory = item.category
      startIndex = idx
      count = 1
    } else {
      count++
    }
  })
  // 处理最后一段
  if (count > 0) {
    spans[startIndex] = count
    for (let i = startIndex + 1; i < data.value.length; i++) {
      if (spans[i] === 1 && data.value[i].category === lastCategory) {
        spans[i] = 0
      }
    }
  }
  return spans
})

// 列配置
const mergedColumns = computed(() => [
  {
    title: '分类',
    dataIndex: 'category',
    customCell: (_, rowIndex) => {
      return {
        rowSpan: rowSpans.value[rowIndex],
      }
    },
  },
  {
    title: '商品',
    dataIndex: 'product',
  },
  {
    title: '数量',
    dataIndex: 'qty',
  },
])
</script>

<style scoped>
td {
  text-align: center;
  vertical-align: middle;
}
</style>
