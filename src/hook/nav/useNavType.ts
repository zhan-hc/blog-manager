import { onMounted, reactive, toRefs, ref } from 'vue'
import { getJumpTypes, addJump, updateJump, deleteJump } from "@/api/jump"
import { jumpType } from '@/constants/types'
import { ElMessage, ElMessageBox } from 'element-plus'
export default function () {

  const state: {
    selectInput: string;
    jumpList: jumpType[];
    pageSize: number;
    pageNo: number;
    total: number;
  } = reactive({
    selectInput: '',
    jumpList: [],
    pageSize: 10,
    pageNo: 1,
    total: 0
  })

  const deleteJumpType = async (data: any) => {
    ElMessageBox.confirm(
     ` 删除前，请先确认该链接类型没有关联链接！确认删除 ${data.link_name} 导航链接类型吗?`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      await deleteJump(data.jump_id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      await getJumpList()
    })
    .catch(() => {
    })
  }

  const getJumpList = async () => {
    const params:any = {
      jump_tag: state.selectInput,
      pageSize: state.pageSize,
      pageNo: state.pageNo
    }
    const [err, { jump = [], total = 0 }]:any = await getJumpTypes(params)
    state.jumpList = jump
    state.total = total
  }



  onMounted(async () => {
    getJumpList()
  })

  return {
    ...toRefs(state),
    deleteJumpType,
    getJumpList
  }
}