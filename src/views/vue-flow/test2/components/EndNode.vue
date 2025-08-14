<template>
  <div class="end-node" :class="{ completed: nodeIsCompleted }">
    <span :class="{ completed: data?.[0]?.isCompleted === '1' }">{{ data?.[0]?.content }}</span>
    <Handle type="target" :position="Position.Top" :connectable="false" />
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps({
  data: Array
})

//整个节点都完成
const nodeIsCompleted = computed(() => props.data.every(item => item.isCompleted === '1'))
//部分节点完成
const nodeIsApproving = computed(() => props.data.some(item => item.isCompleted === '1'))
</script>

<style>
.end-node {
  padding: 10px 20px;
  border-radius: 25px;
  background: #f0f0f0;
  text-align: center;
  color: #111; /* default black */
}

.end-node .completed {
  color: #16a34a; /* green for passed */
  font-weight: 500;
  border-color: #228b22; /* forestgreen */
}

.end-node.completed {
  border: 1px solid #16a34a;
}
</style>
