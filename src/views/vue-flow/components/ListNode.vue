<template>
  <div class="list-node"
       :class="{ completed: nodeIsCompleted,'list-node-solid':nodeIsCompleted || nodeIsApproving ,'list-node-dashed':!(nodeIsCompleted || nodeIsApproving) }">
    <Handle type="target" :position="Position.Top" :connectable="false" />
    <ul>
      <li v-for="(item, index) in data" :key="index" :class="{ completed: item.isCompleted === '1' }">
        {{ item.content }}
      </li>
    </ul>
    <Handle type="source" :position="Position.Bottom" :connectable="false" />
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
.list-node {
  padding: 10px;
  background: #f7f7f7;
  border-radius: 5px;
  max-width: 500px;
}

.list-node-solid {
  border: 1px solid #16a34a;
}

.list-node-dashed {
  border: 1px dashed #505050;
}

.list-node ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list-node li {
  padding: 5px 0;
  color: #111; /* default black */
}

.list-node .completed {
  color: #16a34a; /* green for passed */
  font-weight: 500;
  border-color: #228b22; /* forestgreen */
}
</style>
