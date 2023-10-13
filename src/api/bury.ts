import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getLinkData = (params:any = {}) => {
  return MyRequest.request({
    url: '/bury/getLinkData',
    method: 'GET',
    params
  })
}
export const getPvAndUv = (params:any = {}) => {
  return MyRequest.request({
    url: '/bury/getPvAndUv',
    method: 'GET',
    params
  })
}