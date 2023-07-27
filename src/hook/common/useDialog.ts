import { reactive, toRefs } from 'vue'

export default function () {
  const state = reactive({
    dialogVisible: false
  })

  return {
    ...toRefs(state)
  }
}