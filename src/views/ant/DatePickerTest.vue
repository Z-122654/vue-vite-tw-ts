<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Date Picker 数据结构测试</h1>

    <div class="space-y-6">
      <!-- 基础日期选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">基础日期选择器</h2>
        <a-date-picker v-model:value="value1" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value1) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value1 }}
        </div>
      </div>

      <!-- 月份选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">月份选择器</h2>
        <a-date-picker v-model:value="value2" picker="month" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value2) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value2 }}
        </div>
      </div>

      <!-- 你要求的月份选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">指定月份选择器 (value3)</h2>
        <a-date-picker v-model:value="value3" picker="month" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value3) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value3 }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          构造函数: {{ value3?.constructor?.name }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          Day.js 对象方法: {{ value3 ? Object.getOwnPropertyNames(value3).filter(name => !name.startsWith('_')).slice(0, 10) : 'N/A' }}
        </div>
      </div>

      <!-- 年份选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">年份选择器</h2>
        <a-date-picker v-model:value="value4" picker="year" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value4) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value4 }}
        </div>
      </div>

      <!-- 周选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">周选择器</h2>
        <a-date-picker v-model:value="value5" picker="week" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value5) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value5 }}
        </div>
      </div>

      <!-- 季度选择器 -->
      <div class="border p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">季度选择器</h2>
        <a-date-picker v-model:value="value6" picker="quarter" />
        <div class="mt-2 text-sm text-gray-600">
          值: {{ JSON.stringify(value6) }}
        </div>
        <div class="mt-1 text-sm text-gray-500">
          类型: {{ typeof value6 }}
        </div>
      </div>

      <!-- 所有值汇总 -->
      <div class="border p-4 rounded-lg bg-gray-50">
        <h2 class="text-lg font-semibold mb-4">所有值汇总</h2>
        <pre class="text-sm overflow-auto">{{ allValues }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Dayjs } from 'dayjs'

// 定义各种类型的值
const value1 = ref<Dayjs>() // 基础日期
const value2 = ref<Dayjs>() // 月份
const value3 = ref<Dayjs>() // 你要求的月份选择器
const value4 = ref<Dayjs>() // 年份
const value5 = ref<Dayjs>() // 周
const value6 = ref<Dayjs>() // 季度

// 计算所有值的汇总信息
const allValues = computed(() => {
  return {
    value1: {
      value: value1.value,
      type: typeof value1.value,
      constructor: value1.value?.constructor?.name,
      format: value1.value?.format('YYYY-MM-DD')
    },
    value2: {
      value: value2.value,
      type: typeof value2.value,
      constructor: value2.value?.constructor?.name,
      format: value2.value?.format('YYYY-MM')
    },
    value3: {
      value: value3.value,
      type: typeof value3.value,
      constructor: value3.value?.constructor?.name,
      format: value3.value?.format('YYYY-MM'),
      // 显示更多 Day.js 对象的内部结构
      dayjsProps: value3.value ? Object.getOwnPropertyNames(value3.value).filter(name => !name.startsWith('_')).slice(0, 15) : []
    },
    value4: {
      value: value4.value,
      type: typeof value4.value,
      constructor: value4.value?.constructor?.name,
      format: value4.value?.format('YYYY')
    },
    value5: {
      value: value5.value,
      type: typeof value5.value,
      constructor: value5.value?.constructor?.name,
      format: value5.value?.format('YYYY-ww')
    },
    value6: {
      value: value6.value,
      type: typeof value6.value,
      constructor: value6.value?.constructor?.name,
      format: value6.value?.format('YYYY-[Q]Q')
    }
  }
})
</script>