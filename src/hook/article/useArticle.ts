import { onMounted, reactive, toRefs, ref } from 'vue'
import { getArticleList, deleteArticle } from "@/api/atricle";
import { ArticleType } from '@/constants/types';
export default function () {

  const state: {
    selectInput: string;
    articleList: ArticleType[];
    pageSize: number;
    pageNo: number;
  } = reactive({
    selectInput: '',
    articleList: [],
    pageSize: 10,
    pageNo: 1
  })

  const delArticle = async (id: number) => {
    await deleteArticle(id)
  }

  const getAllArticle = async () => {
    const params = {
      article_title: state.selectInput,
      article_tag: '',
      category_id: '',
      pageSize: state.pageSize,
      pageNo: state.pageNo
    }
    const [err, { articleList = [] }]:any = await getArticleList(params)
    state.articleList = articleList
  }

  onMounted(async () => {
    getAllArticle()
  })

  return {
    ...toRefs(state),
    delArticle
  }
}