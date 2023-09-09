
import { reactive, onMounted, toRefs } from "vue";
import { getCategoryList, deleteCategory } from '@/api/category'
import { CategoryListParams, CategoryType, } from '@/constants/types'

export default function (type: string = 'all',) {

  const state: {
    page: CategoryListParams
    total: number,
    categoryList: CategoryType[];
  } = reactive({
    page: {  // 分页准备的数据
      pageSize: 10,
      pageNo: 1,
      category_name: ''
    },
    categoryList: [],
    total: 0,  // 列表总数据量
  })

  // 获取列表信息
  const getCategoryListFun = async () => {
    const [_err, { total = 0, categoryList = [] }]: any = await getCategoryList(type !== 'all' ? state.page : void 0);
    state.total = total
    state.categoryList = categoryList;
  }

  onMounted(async () => {
    await getCategoryListFun()
  })


  // 点击删除
  const tapDelete = async (id: number) => {
    ElMessageBox.confirm(
      '确认删除这个标签吗?',
      '提示',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        await deleteCategory(id)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        getCategoryListFun()
      })

  }
  // 点击搜素
  const tapSearch = async () => {
    state.page.pageNo = 1
    await getCategoryListFun()
  }
  // 点击重置
  const tapSearchReset = async () => {
    state.page.category_name = ''
    await getCategoryListFun()
  }

  return {
    ...toRefs(state),
    getCategoryListFun,
    tapDelete,
    tapSearch,
    tapSearchReset
  }
}