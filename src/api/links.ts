import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getLinks = () => {
  return MyRequest.request({
    url: '/links/getLinks',
    method: 'GET'
  })
}