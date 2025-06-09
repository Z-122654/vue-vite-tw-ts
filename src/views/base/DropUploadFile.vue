<script setup lang="ts">
function onDragover(e) {
  e.preventDefault()
}

function onDrop(e) {
  e.preventDefault()
  console.log(e.dataTransfer.files)
}
</script>

<template>
  <div>
    <div id="drop-box" @dragover="onDragover" @drop="onDrop"></div>
  </div>
</template>

<style scoped lang="sass">
$base-size: 300px
$drop-box-style-color: #467fe0
$drop-box-border: 1px solid $drop-box-style-color
#drop-box
  display: inline-block
  width: $base-size
  height: $base-size
  border: $drop-box-border
  background-image: url("@/assets/drop/drop.png")
  background-repeat: no-repeat
  background-size: calc($base-size * 0.5)
  background-position: center
  margin-top: 30px
  margin-left: 50%
  transform: translateX(-50%)
</style>