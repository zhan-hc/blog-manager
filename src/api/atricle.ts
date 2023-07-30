import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getArticleList = (params: any) => {
  return MyRequest.request({
    url: '/article/getArticleList',
    method: 'GET',
    params
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

export const updateArticle = (data: any) => {
  return MyRequest.request({
    url: '/article/updateArticle',
    method: 'POST',
    data
  })
}

export const deleteArticle = (id: number) => {
  return MyRequest.request({
    url: '/article/deleteArticle',
    method: 'DELETE',
    data: {
      id
    }
  })
}