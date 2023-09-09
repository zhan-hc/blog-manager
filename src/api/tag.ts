import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/

// 获取列表
export const getTagList = (params?: any) => {
  return MyRequest.request({
    url: '/tag/getTagList',
    method: 'GET',
    params
  })
}

export const getTagToId = (id: string) => {
  return MyRequest.request({
    url: '/tag/getTagToId',
    method: 'GET',
    params: { id }
  })
}

export const addTag = (data: any) => {
  return MyRequest.request({
    url: '/tag/addTag',
    method: 'POST',
    data
  })
}

export const updateTag = (data: any) => {
  return MyRequest.request({
    url: '/tag/updateTag',
    method: 'POST',
    data
  })
}

export const deleteTag = (id: number) => {
  return MyRequest.request({
    url: '/tag/deleteTag',
    method: 'DELETE',
    data: {
      id
    }
  })
}