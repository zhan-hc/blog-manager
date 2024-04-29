import { reactive, toRefs, ref } from 'vue'
import { getCategoryToId, updateCategory, addCategory } from '@/api/category'
import type { FormInstance } from 'element-plus'
import { ProjectType } from '@/constants/types'
import { addProject, updateProject } from '@/api/project'

export default function () {
    const projectFormRef = ref<FormInstance>()
    const state = reactive({
      formData: { // 表单数据
        project_imgurl: '',
        project_url: '',
        project_name: '',
        project_desc: '',
        },
    })
    // 表单的校验
    const rules = {
      project_name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
      ],
      project_url: [
        { required: true, message: '请输入项目链接', trigger: 'blur' }
      ]
    }

    const setFormData = async (data: any) => {
        state.formData = data
    }
    // 点击弹框的确定  此函数决定调用 编辑或添加
    const submitForm = async (isAdd: boolean) => {
        if (!projectFormRef?.value) return
        let params: ProjectType = {
          ...state.formData,
          update_time: +new Date(),
        }
        await projectFormRef.value.validate().then(async () => {
          if (isAdd) {
            params.create_time = +new Date()
            await addProject(params)
          } else {
            await updateProject(params)
          }
          ElMessage({
            message: `${isAdd ? '添加' : '修改'}成功`,
            type: 'success',
          })
        }).catch(err => {
            console.log('表单校验失败', err);
        })
    }

    // 弹窗关闭回调 用来清空数据
    const closePop = () => {
        state.formData = {
          project_imgurl: '',
          project_url: '',
          project_name: '',
          project_desc: ''
        }
    }

    return {
        ...toRefs(state),
        rules,
        projectFormRef,
        setFormData,
        closePop,
        submitForm
    }
}