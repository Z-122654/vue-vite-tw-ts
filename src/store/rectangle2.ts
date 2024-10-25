import { defineStore } from 'pinia'

export const useRectangleStore = defineStore('rectangle2', {
  state: () => ({
    wt: 200,
    ht: 200
  }),
  getters: {
    width: (state) => state.wt,
    height: (state) => state.ht
  },
  actions: {
    becomeBigger() {
      this.wt = this.wt * 1.1
      this.ht = this.ht * 1.1
    },
    becomeSmaller() {
      this.wt = this.wt * 0.9
      this.ht = this.ht * 0.9
    }
  }
})