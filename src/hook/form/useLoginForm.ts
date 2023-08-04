import { reactive, toRefs, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { LoginType } from "@/constants/types";
import { authLogin } from "@/api/login";
import useRouter from '@/hook/common/useRouter'
import useStorage from "../common/useStorage";

export default function () {

  const { routerGo } = useRouter()
  const { Local } = useStorage()
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
        const [err, { user = {}, access_token = ''}]:any = await authLogin(state.formData)
        Local.set('userInfo', user)
        Local.set('access_token', `Bearer ${access_token}`)
        !err && ElMessage({
          type: 'success',
          message: '登录成功'
        })
        routerGo('/')
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