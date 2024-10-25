<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRectangleStore } from '@/store/rectangle'
// import { useRectangleStore } from '@/store/rectangle2'

const store = useRectangleStore()

// `wt` 和 `ht` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { wt, ht } = storeToRefs(store)

// 作为 action 的 increment 可以直接解构
const { becomeBigger, becomeSmaller } = store

function big() {
  store.becomeBigger()
}

function small() {
  store.becomeSmaller()
}
</script>
<template>
  <div class="box">
    <div style="display: flex;justify-content: space-between;">
      <div class="btn-box">
        <a-button type="primary" @click="big">变大</a-button>
        <a-button type="primary" @click="small">变小</a-button>
      </div>
      <div class="btn-box">
        <a-button type="dashed" @click="becomeBigger">变大</a-button>
        <a-button type="dashed" @click="becomeSmaller">变小</a-button>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between">
      <div
        :style="'display: inline-block;width:'+ store.width+'px;height: '+store.height+'px;background-color: blue;'"></div>
      <div
        :style="'display: inline-block;width:'+ wt+'px;height: '+ht+'px;background-color: red;'"></div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.box
  display: flex
  flex-direction: column
  row-gap: 10px

</style>