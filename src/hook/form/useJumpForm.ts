import { reactive, toRefs, ref } from "vue"
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { addJump, updateJump } from '@/api/jump'
import { jumpType } from "@/constants/types"

export default function () {

  const navForm = ref<FormInstance>()
  const state: {
    formData: any;
    formRule: FormRules<any>;
  } = reactive({
    formData: {
      jump_id: 0,
      jump_tag: '',
      jump_desc: '',
      jump_priority: 1
    },
    formRule: {
      jump_tag: { required: true, message: '请输入导航链接名称', trigger: 'blur' },
    }
  })
  const fillForm = (data: any) => {
    state.formData = {
      jump_id: data.jump_id || 0,
      jump_tag: data.jump_tag || '',
      jump_desc: data.jump_desc || '',
      jump_priority: data.jump_priority
    }
  }

  const resetFormData = () => {
    state.formData = {
      jump_id: 0,
      jump_tag: '',
      jump_desc: '',
      jump_priority: 1
    }
  }

  const submitForm = async (isAdd: boolean) => {
    if (!navForm.value) return
    const params: jumpType = {
      jump_tag: state.formData.jump_tag,
      jump_desc: state.formData.jump_desc,
      jump_priority: state.formData.jump_priority,
      update_time: +new Date()
    }
    await navForm.value.validate(async (valid, fields) => {
      if (valid) {
        if (isAdd) {
          params.create_time = +new Date()
          await addJump(params)
        } else {
          params.jump_id = state.formData.jump_id
          await updateJump(params)
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