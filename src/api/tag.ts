import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getTagList = () => {
  return MyRequest.request({
    url: '/tag/getTagList',
    method: 'GET'
  })
}