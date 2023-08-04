import { reactive, toRefs, ref, onMounted } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
import useRouter from '@/hook/common/useRouter'
import { addArticle, getArticleDetail, updateArticle } from '@/api/atricle';
export default function () {

  const { getRouterParams, routerGo } = useRouter()
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
    await articleForm.value.validate(async (valid, fields) => {
      if (valid) {
        const params = {
          ...state.formData,
          tagIds: state.tag_ids,
          update_time: +new Date()
        }
        const article_id = getRouterParams('id')
        if (article_id) {
          params.article_id = Number(article_id)
          await updateArticle(params)
        } else {
          params.create_time = +new Date()
          await addArticle(params)
        }
        ElMessage({
          type: 'success',
          message: article_id ? '更新文章成功' : '新建文章成功',
        })
        routerGo('', 'back')
        console.log('submit!', state.formData)
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const editForm = (data: any, cb: any = () => {}) => {
    const { article_title, article_desc, article_cover, category_id, article_content, tag_id_blog_tags } = data
    state.tag_ids = tag_id_blog_tags.map((item: {tag_id: number}) => item.tag_id)
    state.formData = {
      article_title,
      article_desc,
      article_cover,
      category_id,
      article_content
    }
    cb()
  }
  const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const imgfileType = ['image/gif','image/jpeg','image/jpg','image/pjpeg','image/x-png','image/png']
    if (!imgfileType.includes(rawFile.type)) {
      ElMessage.error('上传文件的格式不正确，请上传一下gif,jpeg,jpg,png格式!')
      return false
    }
    return true
  }

  const uploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    state.formData.article_cover = response.data.imgUrl
  }

  onMounted(async () => {
    const id = getRouterParams('id')
    if (id) {
      state.id = id as string
      const [err, {article = {} }]:any = await getArticleDetail(id as string)
      editForm(article)
    }
  })
  return {
    ...toRefs(state),
    articleForm,
    editForm,
    submitForm,
    beforeUpload,
    uploadSuccess
  }
}