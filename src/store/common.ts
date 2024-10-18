import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCommonStore = defineStore('common', () => {
  const addRouters = ref(false)
  function updateRouterStatus(val: boolean) {
    addRouters.value = val
  }

  return { addRouters, updateRouterStatus }
})