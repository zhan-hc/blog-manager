import { reactive, toRefs, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';
import useRouter from '@/hook/common/useRouter'
import { getArticleDetail } from '@/api/atricle';
export default function () {

  const { getRouterParams } = useRouter()
  const articleForm = ref<FormInstance>()

  const state: {
    id: string;
    tag_ids: number[];
    formData: any;
    formRule: FormRules<any>;
  } = reactive({
    id: '',
    tag_ids: [],
    formData: {
      article_title: '',
      article_desc: '',
      article_cover: '',
      category_id: '',
      article_content: ''
    },
    formRule: {
      article_title: { required: true, message: '请输入文章标题', trigger: 'blur' },
      category_id: {required: true, message: '请选择文章分类', trigger: 'blur'}
    }
  })

  const submitForm = async () => {
    if (!articleForm.value) return
    await articleForm.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const editForm = (data: any, cb: any = () => {}) => {
    const { article_title, article_desc, article_cover, article_tag, category_id, article_content } = data
    state.tag_ids = article_tag.split(',').map(Number)
    state.formData = {
      article_title,
      article_desc,
      article_cover,
      category_id,
      article_content
    }
    cb()
  }

  onMounted(async () => {
    const id = getRouterParams('id')
    if (id) {
      state.id = id as string
      const [err, {article = {} }]:any = await getArticleDetail(id as string)
      console.log(article, 'articlearticlearticlearticlearticle')
      editForm(article)
    }
  })
  return {
    ...toRefs(state),
    articleForm,
    editForm,
    submitForm
  }
}