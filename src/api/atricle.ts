import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getArticleList = () => {
  return MyRequest.request({
    url: '/article/getArticleList',
    method: 'GET'
  })
}