import { reactive, toRefs, ref } from "vue"
import type { FormInstance, FormRules } from 'element-plus';
import { LoginType } from "@/constants/types"

export default function () {

  const loginForm = ref<FormInstance>()
  const state: {
    formData: LoginType;
    formRule: FormRules<LoginType>;
  } = reactive({
    formData: {
      username: '',
      password: ''
    },
    formRule: {
      username: { required: true, message: '请输入用户名', trigger: 'blur' },
      password: { required: true, message: '请输入密码', trigger: 'blur' },
    }
  })

  const handleLogin = async () => {
    if (!loginForm.value) return
    await loginForm.value.validate(async (valid, fields) => {
      if (valid) {
        console.log('zzzzzzzz')
      } else {
        console.log('error')
      }
    })
  }
  return {
    ...toRefs(state),
    loginForm,
    handleLogin
  }
}