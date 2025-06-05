import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const fetchVisitorData = (data:any = {}) => {
  return MyRequest.request({
    url: '/visitor/getDayRecord',
    method: 'POST',
    data
  })
}