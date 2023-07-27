import { onMounted, reactive, toRefs } from 'vue'
export default function () {

  const state: {
  } = reactive({})

  onMounted(() => {
    
  })

  return {
    ...toRefs(state)
  }
}