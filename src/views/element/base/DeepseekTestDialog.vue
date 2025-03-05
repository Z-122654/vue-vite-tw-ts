<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>

<template>
  <el-button plain @click="dialogVisible = true">
    Open a draggable Dialog
  </el-button>
  <el-dialog id="dialog-box" :width="500" v-model="dialogVisible" title="Tips" draggable :modal="false"
             :close-on-click-modal="false">
    <span>It's a draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        dsf
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-dialog__body) {
  display: inline-block;
  background-color: red;
  height: 350px !important;
}
</style>