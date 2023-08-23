import { onMounted, reactive, toRefs, ref } from 'vue'
import { getFilterLinks, deleteLink } from '@/api/links'
import { LinkType } from '@/constants/types'
import { ElMessage, ElMessageBox } from 'element-plus'
export default function () {

  const state: {
    selectInput: string;
    linkList: LinkType[];
    pageSize: number;
    pageNo: number;
    total: number;
  } = reactive({
    selectInput: '',
    linkList: [],
    pageSize: 10,
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
    const [err, { links = [], total = 0 }]:any = await getFilterLinks(params)
    state.linkList = links
    state.total = total
  }



  onMounted(async () => {
    getLinkList()
  })

  return {
    ...toRefs(state),
    deleteLinks,
    getLinkList
  }
}