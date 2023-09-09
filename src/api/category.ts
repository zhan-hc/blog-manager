import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getCategoryList = (params?: any) => {
  return MyRequest.request({
    url: '/category/getCategoryList',
    method: 'GET',
    params
  })
}

export const getCategoryToId = (id: string) => {
  return MyRequest.request({
    url: '/category/getCategoryToId',
    method: 'GET',
    params: { id }
  })
}

export const addCategory = (data: any) => {
  return MyRequest.request({
    url: '/category/addCategory',
    method: 'POST',
    data
  })
}

export const updateCategory = (data: any) => {
  return MyRequest.request({
    url: '/category/updateCategory',
    method: 'POST',
    data
  })
}

export const deleteCategory = (id: number) => {
  return MyRequest.request({
    url: '/category/deleteCategory',
    method: 'DELETE',
    data: {
      id
    }
  })
}