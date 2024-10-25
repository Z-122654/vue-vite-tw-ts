import { defineStore } from 'pinia'
import { computed, Ref, ref } from 'vue'

export const useRectangleStore = defineStore('rectangle', () => {
  const wt: Ref<number> = ref(200)
  const ht: Ref<number> = ref(200)

  const width = computed(() => {
    return wt.value
  })
  const height = computed(() => {
    return ht.value
  })

  const becomeBigger = (): void => {
    wt.value *= 1.1
    ht.value *= 1.1
  }
  const becomeSmaller = (): void => {
    wt.value *= 0.9
    ht.value *= 0.9
  }

  return { wt, ht, width, height, becomeBigger, becomeSmaller }
})