import { reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { LoginType } from "@/constants/types";
import { authLogin } from "@/api/login";
import useRouter from '@/hook/common/useRouter'
import { Local } from "@/utils/local"
import { getMenus } from "@/api/menu";
import { MENU_KEY } from "@/constants";
import { addPageToRouter } from "@/utils/route";
export default function () {

  const { routerGo } = useRouter()
  const loginForm = ref<FormInstance>()

  const formRule: FormRules<LoginType> =  reactive({
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  })

  const formData: LoginType = reactive({
    username: '',
    password: ''
  })

  const handleAuthLogin = async () => {
    const [err, { user = {}, access_token = ''}]:any = await authLogin(formData)
    Local.set('userInfo', user)
    Local.set('access_token', `Bearer ${access_token}`)
    !err && ElMessage({
      type: 'success',
      message: '登录成功'
    })
  }
  
  const handleGetMenu = async () => {
    const [err, data] = await getMenus()
    if (!err) {
      Local.set(MENU_KEY, data)
      addPageToRouter()
    }
  }
  const handleLogin = async () => {
    if (!loginForm.value) return
    await loginForm.value.validate(async (valid, fields) => {
      if (valid) {
        await handleAuthLogin()
        await handleGetMenu()
        routerGo('/')
      } else {
        console.log('error')
      }
    })
  }
  return {
    formRule,
    formData,
    loginForm,
    handleLogin
  }
}