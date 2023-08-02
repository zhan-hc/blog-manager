import { LoginType } from '@/constants/types'
import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const authLogin = (data: LoginType) => {
  return MyRequest.request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}