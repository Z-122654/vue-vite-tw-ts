<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import { Button, message, Modal } from 'ant-design-vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

/** ==================== 类型定义 ==================== */

/** API 返回的月度数据项 */
type ApiMonthItem = {
  id?: string
  monthAmount?: string
  reportDate?: string
}

/** API 返回格式: 指标编码 -> 月份键 -> 数据项 */
type ApiResult = Record<string, Record<string, ApiMonthItem>>

/** 单元格元数据，用于编辑和明细 */
type CellMeta = {
  code: string          // 指标编码
  date: string          // 日期
  value: string         // 当前值
  apiItem?: ApiMonthItem // 原始 API 数据项（包含 id 等）
}

/** 行记录类型 - 日期作为主维度，指标编码作为动态字段 */
type RowRecord = {
  key: string                              // 唯一标识（使用日期）
  date: string                             // 日期列
  __meta: Record<string, ApiMonthItem>     // 原始元数据映射
}

/** 动态指标值的字段类型 */
type DynamicRowRecord = RowRecord & Record<string, string>

/** 组件 Props 定义 */
interface Props {
  /** API 数据源，可选。如果不传则内部通过 fetchApi 获取 */
  data?: ApiResult
  /** 是否启用编辑功能 */
  editable?: boolean
  /** 是否启用行明细功能 */
  rowDetailEnabled?: boolean
}

/** 组件 Emits 定义 */
interface Emits {
  /** 编辑单元格事件 */
  (e: 'edit', meta: CellMeta): void
  /** 查看单元格明细事件 */
  (e: 'cell-detail', meta: CellMeta): void
  /** 查看行明细事件 */
  (e: 'row-detail', record: DynamicRowRecord): void
  /** 数据加载完成事件 */
  (e: 'loaded', data: DynamicRowRecord[]): void
}

const props = withDefaults(defineProps<Props>(), {
  editable: true,
  rowDetailEnabled: true
})

const emit = defineEmits<Emits>()

/** ==================== 状态管理 ==================== */

const loading = ref(false)
const raw = ref<ApiResult>({
  "ZB202512290051": {
    "2026-01": {
      "id": "92fecbedb2c74d4f818146b21c4cb018",
      "monthAmount": "5000",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  },
  "ZB202512290052": {
    "2026-01": {
      "id": "e492b13bdfef4f348e629700954c3e81",
      "monthAmount": "6000",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  },
  "ZB202512290053": {
    "2026-01": {
      "id": "6e9e04a7e274465e963a045f66f60033",
      "monthAmount": "4000",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  },
  "ZB202512290054": {
    "2026-01": {
      "id": "4d5aad1c61c34bc18f18ac6d19bea5b2",
      "monthAmount": "5000",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  },
  "ZB202512290055": {
    "2026-01": {
      "id": "fdb51a4ccf3b4ff8895b2b27950133fe",
      "monthAmount": "30",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  },
  "ZB202512290056": {
    "2026-01": {
      "id": "7a6114af25a54afeb6037bb3b5a2e76b",
      "monthAmount": "5000",
      "reportDate": "2026-01-01"
    },
    "2026-02": {
      "monthAmount": "",
      "reportDate": "2026-02-01"
    },
    "2026-03": {
      "monthAmount": "",
      "reportDate": "2026-03-01"
    }
  }
})
const dataSource = ref<DynamicRowRecord[]>([])

/** ==================== API 请求 ==================== */

/**
 * 获取数据的 API 请求
 * TODO: 替换为真实的 API 调用
 * @returns Promise<ApiResult>
 */
async function fetchApi(): Promise<ApiResult> {
  // 示例: return (await axios.get('/api/financial-metrics/production')).data
  return raw.value
}

/** ==================== 计算属性 ==================== */

/**
 * 从原始数据中提取所有指标编码，排序后作为动态列的 key
 */
const codeKeys = computed(() => {
  return Object.keys(raw.value).sort()
})

/**
 * 动态生成表格列配置
 * 固定左侧日期列，右侧为动态指标编码列
 */
const columns = computed<TableColumnsType>(() => {
  // 日期固定列
  const dateColumn: TableColumnsType[0] = {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    fixed: 'left',
    width: 120,
    align: 'center'
  }

  // 动态指标编码列
  const codeCols: TableColumnsType = codeKeys.value.map((code) => ({
    title: code,
    dataIndex: code,
    key: code,
    align: 'right' as const,
    width: 140,
    /**
     * 单元格渲染函数
     * - 空值显示 '-'
     * - 有值则显示值 + 操作按钮组
     */
    customRender: ({ text, record }: { text: string; record: DynamicRowRecord }) => {
      const value = (text ?? '').toString().trim()
      const meta = record.__meta?.[code]

      if (!value) {
        return h('span', { class: 'empty-cell' }, '-')
      }

      // 编辑按钮（靠左）
      const editButton = props.editable
        ? h(Button, {
          type: 'link',
          size: 'small',
          icon: h(EditOutlined),
          'aria-label': `编辑 ${code} 在 ${record.date} 的值`,
          onClick: () => onEditCell(record.date, code, value, meta)
        })
        : null

      // 编辑按钮（左） + 值（右）
      return h('div', { class: 'cell-content' }, [
        editButton,
        h('span', { class: 'cell-value' }, value)
      ])
    },
    /**
     * 单元格自定义属性
     * 添加 class 用于样式定制
     */
    customCell: (record: DynamicRowRecord) => {
      const value = record[code] ?? ''
      const isEmpty = !value.toString().trim()
      return {
        class: ['col-code', isEmpty ? 'cell-empty' : 'cell-filled']
      }
    }
  }))

  return [dateColumn, ...codeCols]
})

/** ==================== 数据处理 ==================== */

/**
 * 数据归一化函数
 * 将 API 返回的"指标×月"结构转换为"日期×指标"的行结构
 *
 * @param api - API 原始数据
 * @returns 归一化后的行数据数组
 */
function normalize(api: ApiResult): DynamicRowRecord[] {
  // 按日期聚合所有指标数据
  const dateMap = new Map<string, Record<string, ApiMonthItem>>()

  Object.entries(api).forEach(([code, monthMap]) => {
    Object.entries(monthMap || {}).forEach(([monthKey, item]) => {
      // 优先使用 reportDate，否则使用月份+默认日期
      const date = item?.reportDate || `${monthKey}-01`
      if (!dateMap.has(date)) {
        dateMap.set(date, {})
      }
      dateMap.get(date)![code] = item
    })
  })

  // 转换为行数据，按日期排序
  return Array.from(dateMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, codeMap]) => {
      const row: DynamicRowRecord = {
        key: date,
        date,
        __meta: {}
      }
      // 将每个指标的值和元数据分别存入 row
      for (const [code, item] of Object.entries(codeMap)) {
        row[code] = item?.monthAmount ?? ''
        row.__meta[code] = item
      }
      return row
    })
}

/** ==================== 数据加载 ==================== */

/**
 * 加载数据
 * 如果 props.data 存在则使用它，否则调用 fetchApi
 */
async function load() {
  loading.value = true
  try {
    // 优先使用 props 传入的数据
    const res = props.data ?? await fetchApi()
    raw.value = res || {}
    dataSource.value = normalize(raw.value)
    emit('loaded', dataSource.value)
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || e?.message || '加载数据失败'
    message.error(errorMsg)
    console.error('数据加载失败:', e)
  } finally {
    loading.value = false
  }
}

/**
 * 刷新数据
 * 可由父组件调用
 */
async function refresh() {
  await load()
}

/** ==================== 事件处理 ==================== */

/**
 * 查看单元格明细
 * 触发 cell-detail 事件，由父组件处理弹窗或跳转
 */
function onCellDetail(date: string, code: string, value: string, meta?: ApiMonthItem) {
  const cellMeta: CellMeta = { code, date, value, apiItem: meta }
  emit('cell-detail', cellMeta)
}

/**
 * 查看行明细
 * 触发 row-detail 事件，由父组件处理
 */
function onRowDetail(record: DynamicRowRecord) {
  emit('row-detail', record)
}

/**
 * 编辑单元格
 * 触发 edit 事件，由父组件打开编辑弹窗
 */
function onEditCell(date: string, code: string, value: string, meta?: ApiMonthItem) {
  const cellMeta: CellMeta = { code, date, value, apiItem: meta }
  emit('edit', cellMeta)
}

/**
 * 表格变化事件处理（排序、筛选等）
 */
function onTableChange(_: any, filters: any, sorter: any) {
  console.log('Table changed:', { filters, sorter })
}

// 暴露方法给父组件
defineExpose({
  refresh,
  load,
  dataSource
})

/** ==================== 生命周期 ==================== */

onMounted(() => {
  load()
})
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="false"
    :scroll="{ x: 'max-content', y: 600 }"
    bordered
    row-key="key"
    :row-class-name="() => 'data-row'"
    @change="onTableChange"
  />
</template>

<style scoped>
/* ==================== 单元格样式 ==================== */

/* 有值的单元格 */
:deep(.cell-filled) {
  font-weight: 500;
  color: #1f2937;
}

/* 空值单元格 */
:deep(.cell-empty) {
  color: #9ca3af;
}

/* ==================== 单元格内容布局 ==================== */

:deep(.cell-content) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: 4px 8px;
  width: 100%;
}

/* 编辑按钮靠左 */
:deep(.cell-content .ant-btn) {
  padding: 0;
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* 悬停时显示编辑按钮 */
:deep(.col-code:hover .cell-content .ant-btn) {
  opacity: 1;
}

/* 单元格值靠右 */
:deep(.cell-value) {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  font-size: 14px;
  color: #4f46e5;
  margin-left: auto;
}

/* 空值显示 */
:deep(.empty-cell) {
  color: #d1d5db;
  font-style: italic;
}

/* ==================== 表格行样式 ==================== */

/* 数据行悬停效果 */
:deep(.data-row:hover td) {
  background-color: #fafafa;
}

/* 固定列样式保持一致 */
:deep(.data-row:hover td.ant-table-cell-fix-left) {
  background-color: #fafafa;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
  :deep(.cell-content .ant-btn) {
    opacity: 1; /* 移动端始终显示编辑按钮 */
  }

  :deep(.cell-value) {
    font-size: 12px;
  }
}
</style>
