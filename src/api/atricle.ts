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

export const getArticleDetail = (id: string) => {
  return MyRequest.request({
    url: '/article/getArticleDetail',
    method: 'GET',
    params: { id }
  })
}

export const addArticle = (data: any) => {
  return MyRequest.request({
    url: '/article/addArticle',
    method: 'POST',
    data
  })
}