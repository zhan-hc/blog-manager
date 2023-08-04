import { reactive, toRefs } from 'vue'

export default function () {
  const state = reactive({
    visible: false,
    isAdd: true
  })

  const openPopover = (isAdd = true) => {
    state.isAdd = isAdd
    state.visible = true
  }

  return {
    ...toRefs(state),
    openPopover
  }
}