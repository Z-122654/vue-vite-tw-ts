<script setup lang="ts">
import { ref } from 'vue'

const username=ref('');
const phone=ref('');

const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <van-cell-group inset>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="phone"
      required
      label="手机号"
      placeholder="请输入手机号"
    />
  </van-cell-group>
  <input type="text" v-focus>

</template>

<style scoped lang="sass">

</style>