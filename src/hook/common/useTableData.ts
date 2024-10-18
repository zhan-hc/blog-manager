import { computed, onMounted, reactive, toRefs } from "vue";

export default function ({
  fetchApi,
  immediate = true
}: {
  fetchApi: any
  immediate?: boolean
}) {
  const state = reactive({
    tableData: [],
    pageData: {
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  })

  const params = computed(() => {
    return {
      pageNo: state.pageData.pageNo,
      pageSize: state.pageData.pageSize
    }
  })

  const handleGetData = async () => {
    const [err, { rows, count }] = await fetchApi(params.value)
    if (!err) {
      state.tableData = rows
      state.pageData.total = count
    }
  }

  const initPageParams = () => {
    state.pageData.pageNo = 1
    state.pageData.pageSize = 10
    handleGetData()
  }

  onMounted(() => {
    immediate && handleGetData()
  })

  return {
    ...toRefs(state),
    handleGetData,
    initPageParams
  }
}