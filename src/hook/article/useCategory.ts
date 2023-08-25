import { onMounted, reactive, toRefs } from 'vue'
import { CategoryType } from '@/constants/types';
import { getCategoryList } from '@/api/category';
export default function () {

  const state: {
    categoryList: CategoryType[];
    total: number;
  } = reactive({
    categoryList: []
  })

  onMounted(async () => {
    const [err, { categoryList = [], total = 0 }]:any = await getCategoryList()
    state.categoryList = categoryList
    state.total = total
  })

  return {
    ...toRefs(state)
  }
}