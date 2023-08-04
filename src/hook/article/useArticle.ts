import { onMounted, reactive, toRefs, ref } from 'vue'
import { getArticleList, deleteArticle } from "@/api/atricle";
import { ArticleType } from '@/constants/types';
export default function () {

  const state: {
    selectInput: string;
    articleList: ArticleType[];
    pageSize: number;
    pageNo: number;
    tagId: number[] | null;
    categoryId: number | null;
    total: number;
  } = reactive({
    selectInput: '',
    articleList: [],
    tagId: null,
    categoryId: null,
    pageSize: 10,
    pageNo: 1,
    total: 0
  })

  const delArticle = async (data: any) => {
    ElMessageBox.confirm(
     ` 确认删除《${data.article_title}》文章吗?`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      await deleteArticle(data.article_id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      await getAllArticle()
    })
    .catch(() => {
    })
  }

  const getAllArticle = async () => {
    const params:any = {
      article_title: state.selectInput,
      category_id: state.categoryId,
      pageSize: state.pageSize,
      pageNo: state.pageNo,
      tagId: state.tagId
    }
    const [err, { articleList = [], total = 0 }]:any = await getArticleList(params)
    state.articleList = articleList
    state.total = total
  }

  const initData = () => {
    state.selectInput = ''
    state.tagId = null,
    state.categoryId = null
    state.pageSize = 10
    state.pageNo = 1
    getAllArticle()
  }

  onMounted(async () => {
    getAllArticle()
  })

  return {
    ...toRefs(state),
    initData,
    delArticle,
    getAllArticle
  }
}