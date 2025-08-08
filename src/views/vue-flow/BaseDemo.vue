<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import ListNode from './components/ListNode.vue'
import StartNode from './components/StartNode.vue'
import EndNode from './components/EndNode.vue'

// these are our nodes
const nodes = ref<Node[]>([
  {
    id: 'start',
    type: 'start',
    position: { x: 500, y: 50 },
    data: [{ isCompleted: '1', content: '开始' }]
  },
  {
    id: '1',
    type: 'list',
    position: { x: 50, y: 200 },
    data: [
      { isCompleted: '1', content: '1.1 提前30分钟各岗位按分工进行交班检查。' },
      { isCompleted: '1', content: '1.2 各岗位值班员向上级值班员汇报检查情况。' },
      { isCompleted: '1', content: '1.3 辅控(公用)系统值班员向班长(或值长)汇报检查结果。' },
      { isCompleted: '1', content: '1.4 各岗位值班员按分工审查表单、台账,无误后再规定位置签字。' },
      { isCompleted: '1', content: '1.5 清点并整理工具、仪表、图纸、措施、资料、安全用具等。' },
      { isCompleted: '1', content: '1.6 各岗位人员填写运行日志,清扫专责区及表盘卫生。' },
      { isCompleted: '1', content: '1.7 上级值班员查阅下级值班员记录及报表是否清楚正确。' }
    ]
  },
  {
    id: '2',
    type: 'list',
    position: { x: 650, y: 200 },
    data: [
      { isCompleted: '1', content: '2.1 提前30分钟各岗位值班员按职责分工进行接班检查。' },
      { isCompleted: '1', content: '2.2 听取交班人员介绍情况,查阅运行日志和工作票的收发情况、措施布置、设备缺陷、指标的记录、上级通知命令、检修交代注意事项。' },
      { isCompleted: '0', content: '2.3 接班前召开班前会,各岗位值班员向上级值班员汇报检查情况。' }
    ]
  },
  {
    id: '3',
    type: 'default', // Using default for the diamond shape, will style it later
    position: { x: 800, y: 450 },
    data: { label: '3 是否满足交接班条件' },
     style: {
      width: '200px',
      height: '100px',
      textAlign: 'center',
      lineHeight: '100px',
      clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
      background: '#fff',
      border: '1px solid #000'
    }
  },
  {
    id: '4',
    type: 'list',
    position: { x: 50, y: 550 },
    data: [
      { isCompleted: '0', content: '4 交接班分歧处理' },
      { isCompleted: '0', content: '4.1 个别岗位不能交班时,其调整操作应接受接班值长的统一指挥。' },
      { isCompleted: '0', content: '4.2 交班负责人应立即处理接班人员提出的合理要求,进行调解。' },
      { isCompleted: '0', content: '4.3 发生分歧由双方值班负责人协商解决,必要时报运行部门负责人处理。' },
      { isCompleted: '0', content: '4.4 未正式交接班前,交班人员不得离岗。' }
    ]
  },
  {
    id: '5',
    type: 'list',
    position: { x: 770, y: 650 },
    data: [{ isCompleted: '0', content: '5 在运行日志上签字，对口接班。' }]
  },
  {
    id: '6',
    type: 'list',
    position: { x: 170, y: 800 },
    data: [{ isCompleted: '0', content: '6 在运行日志上签字，对口交班。' }]
  },
  {
    id: '7',
    type: 'list',
    position: { x: 235, y: 900 },
    data: [{ isCompleted: '0', content: '7 召开班后会。' }]
  },
  {
    id: 'end',
    type: 'end',
    position: { x: 500, y: 950 },
    data: [{ isCompleted: '0', content: '结束' }]
  }
])

// these are our edges
const edges = ref<Edge[]>([
  // 已走过的路径：设为绿色
  { id: 'estart-1', source: 'start', target: '1', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  { id: 'estart-2', source: 'start', target: '2', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  // 其他路径保留默认颜色（未走过）
  { id: 'e3-4', source: '3', target: '4', label: '否', animated: true },
  { id: 'e3-5', source: '3', target: '5', label: '是', animated: true },
  { id: 'e4-3', source: '4', target: '3', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-end', source: '7', target: 'end', animated: true }
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :nodes-draggable="true" :nodes-connectable="false" style="height: 100vh;">
    <template #node-start="nodeProps">
      <StartNode v-bind="nodeProps" />
    </template>

    <template #node-list="nodeProps">
      <ListNode v-bind="nodeProps" />
    </template>

    <template #node-end="nodeProps">
      <EndNode v-bind="nodeProps" />
    </template>
  </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

</style>
