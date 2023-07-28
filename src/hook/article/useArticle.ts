import { onMounted, reactive, toRefs, ref } from 'vue'
import { getArticleList } from "@/api/atricle";
import { ArticleType } from '@/constants/types';
export default function () {

  const state: {
    selectInput: string;
    articleList: ArticleType[];
  } = reactive({
    selectInput: '',
    articleList: []
  })

  onMounted(async () => {
    const [err, { articleList = [] }]:any = await getArticleList()
    state.articleList = articleList
  })

  return {
    ...toRefs(state)
  }
}