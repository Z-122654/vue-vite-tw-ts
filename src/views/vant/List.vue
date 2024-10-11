<script setup lang="ts">
import { onMounted, ref } from 'vue'

const list = ref<number[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  console.log('onLoad')
  debugger
}
</script>

<template>
  <van-list style="display: flex;flex-direction: column;"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item">
        {{item}}
    </van-cell>
  </van-list>
</template>

<style scoped lang="sass">

</style>