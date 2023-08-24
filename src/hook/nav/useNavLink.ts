import { onMounted, reactive, toRefs, ref } from 'vue'
import { getFilterLinks, deleteLink } from '@/api/links'
import { LinkType } from '@/constants/types'
export default function () {

  const state: {
    selectInput: string;
    linkList: LinkType[];
    pageSize: number;
    pageNo: number;
    jumpId: number | null
    total: number;
  } = reactive({
    selectInput: '',
    linkList: [],
    pageSize: 10,
    jumpId: null,
    pageNo: 1,
    total: 0
  })

  const deleteLinks = async (data: any) => {
    ElMessageBox.confirm(
     ` 确认删除 ${data.link_name} 导航链接吗?`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      await deleteLink(data.link_id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      await getLinkList()
    })
    .catch(() => {
    })
  }

  const getLinkList = async () => {
    const params:any = {
      link_name: state.selectInput,
      pageSize: state.pageSize,
      pageNo: state.pageNo
    }
    if (state.jumpId) {
      params['jump_id'] = state.jumpId
    }
    const [err, { links = [], total = 0 }]:any = await getFilterLinks(params)
    state.linkList = links
    state.total = total
  }

  const initFilterData = () => {
    state.selectInput = ''
    state.jumpId = null
  }

  onMounted(async () => {
    getLinkList()
  })

  return {
    ...toRefs(state),
    deleteLinks,
    getLinkList,
    initFilterData
  }
}