import { reactive, onMounted, toRefs } from "vue";
import { getTagList, deleteTag } from '@/api/tag'
import { TagListParams, TagType } from '@/constants/types'


/**
 * 
 * @param type  不需要分页传all或不传  需要分页传page
 * 
 * @returns 
 */

export default function (type: string = 'all',) {
  const state: {
    page: TagListParams
    total: number,
    tagList: TagType[]
  } = reactive({
    page: {  // 分页准备的数据
      pageSize: 10,
      pageNo: 1,
      tag_name: ''
    },
    tagList: [],  // 列表数据
    total: 0,  // 列表总数据量
  })


  onMounted(async () => {
    await getTagListFun()
  })

  // 获取列表信息
  const getTagListFun = async () => {
    const [_err, { total = 0, tagList = [] }]: any = await getTagList(type !== 'all' ? state.page : void 0);
    state.total = total
    state.tagList = tagList;
  }
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
        await deleteTag(id)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        getTagListFun()
      })

  }
  // 点击搜素
  const tapSearch = async () => {
    state.page.pageNo = 1
    await getTagListFun()
  }
  // 点击重置
  const tapSearchReset = async () => {
    state.page.tag_name = ''
    await getTagListFun()
  }

  return {
    ...toRefs(state),
    getTagListFun,
    tapDelete,
    tapSearch,
    tapSearchReset
  }
}