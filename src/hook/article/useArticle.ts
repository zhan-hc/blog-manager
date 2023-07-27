import { onMounted, reactive, toRefs, ref } from 'vue'
import { getArticleList } from "@/api/atricle";
import { ArticleType, tagType } from '@/constants/types';
import type { FormInstance } from 'element-plus';
import { getTagList } from '@/api/tag';
export default function () {

  const articleForm = ref<FormInstance>()
  const state: {
    selectInput: string;
    articleList: ArticleType[];
    tagList: tagType[];
    isAdd: boolean;
  } = reactive({
    selectInput: '',
    articleList: [],
    tagList: [],
    isAdd: true,
    formData: {
      article_title: '',
      article_desc: '',
      article_content: '',
      article_cover: '',
      article_tag: '',
      category_id: ''
    },
    formRule: {
      article_title: { required: true, message: '请输入文章标题', trigger: 'blur' },
    }
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  onMounted(async () => {
    const [articleRes, tagRes] = await Promise.all([getArticleList(), getTagList()])
    const [err1, { articleList = [] }]:any = articleRes
    const [err2, { tagList = [] }]:any = tagRes
    console.log(articleList, tagList, 'tagList')
    state.articleList = articleList
    state.tagList = tagList
  })

  return {
    articleForm,
    ...toRefs(state),
    submitForm
  }
}