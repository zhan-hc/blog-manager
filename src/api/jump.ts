import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getJumpTypes = () => {
  return MyRequest.request({
    url: '/jump/getTypes',
    method: 'GET'
  })
}