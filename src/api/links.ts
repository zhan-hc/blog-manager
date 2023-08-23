import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getLinks = () => {
  return MyRequest.request({
    url: '/links/getLinks',
    method: 'GET'
  })
}
export const getFilterLinks = (params: any) => {
  return MyRequest.request({
    url: '/links/getLinkList',
    method: 'GET',
    params
  })
}

export const addLink = (data: any) => {
  return MyRequest.request({
    url: '/links/addLink',
    method: 'POST',
    data
  })
}

export const updateLink = (data: any) => {
  return MyRequest.request({
    url: '/links/updateLink',
    method: 'POST',
    data
  })
}

export const deleteLink = (id: number) => {
  return MyRequest.request({
    url: '/links/deleteLink',
    method: 'DELETE',
    data: {
      id
    }
  })
}