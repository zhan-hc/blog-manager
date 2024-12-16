import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getRole()
*/
export const getEventList = (params?: any) => {
  return MyRequest.request({
    url: '/event/eventList',
    method: 'GET',
    params
  })
}