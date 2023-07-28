import { onMounted, reactive, toRefs } from 'vue'
import { CategoryType } from '@/constants/types';
import { getCategoryList } from '@/api/category';
export default function () {

  const state: {
    categoryList: CategoryType[]
  } = reactive({
    categoryList: []
  })

  onMounted(async () => {
    const [err, { categoryList = [] }]:any = await getCategoryList()
    state.categoryList = categoryList
  })

  return {
    ...toRefs(state)
  }
}