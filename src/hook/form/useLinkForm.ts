import { reactive, toRefs, ref } from "vue"
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { addLink, updateLink } from '@/api/links'
import { LinkType } from "@/constants/types"

export default function () {

  const navForm = ref<FormInstance>()
  const state: {
    formData: any;
    formRule: FormRules<any>;
  } = reactive({
    formData: {
      link_id: 0,
      link_icon: '',
      link_name: '',
      link_desc: '',
      link_url: '',
      jump_id: '',
      link_priority: 1
    },
    formRule: {
      link_name: { required: true, message: '请输入导航链接名称', trigger: 'blur' },
      link_url: { required: true, message: '请输入导航链接', trigger: 'blur' },
      jump_id: { required: true, message: '请选择导航类型', trigger: 'blur', }
    }
  })
  const fillForm = (data: any) => {
    state.formData = {
      link_id: data.link_id || 0,
      link_icon: data.link_icon || '',
      link_name: data.link_name || '',
      link_desc: data.link_desc || '',
      link_url: data.link_url || '',
      jump_id: data.jump_id || '',
      link_priority: data.link_priority
    }
  }

  const resetFormData = () => {
    state.formData = {
      link_id: 0,
      link_icon: '',
      link_name: '',
      link_desc: '',
      link_url: '',
      jump_id: '',
      link_priority: 1
    }
  }

  const submitForm = async (isAdd: boolean) => {
    if (!navForm.value) return
    const params: LinkType = {
      link_icon: state.formData.link_icon,
      link_name: state.formData.link_name,
      link_desc: state.formData.link_desc,
      link_url: state.formData.link_url,
      jump_id: state.formData.jump_id,
      link_priority: state.formData.link_priority
    }
    await navForm.value.validate(async (valid, fields) => {
      if (valid) {
        if (isAdd) {
          await addLink(params)
        } else {
          params.link_id = state.formData.link_id
          await updateLink(params)
        }
        ElMessage({
          type: 'success',
          message: isAdd ? '新建导航链接成功' : '更新导航链接成功',
        })
      } else {
        console.log('error')
      }
    })
  }

  return {
    ...toRefs(state),
    navForm,
    fillForm,
    submitForm,
    resetFormData
  }
}