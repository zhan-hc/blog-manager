import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getLinkData = () => {
  return MyRequest.request({
    url: '/bury/getLinkData',
    method: 'GET'
  })
}