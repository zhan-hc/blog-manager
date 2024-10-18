import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getRole()
*/
export const getRoleList = (params?: any) => {
  return MyRequest.request({
    url: '/role/getRoles',
    method: 'GET',
    params
  })
}

export const updateRole = (data: any) => {
  return MyRequest.request({
    url: '/role/updateRole',
    method: 'POST',
    data
  })
}

export const deleteRole = (id: number) => {
  return MyRequest.request({
    url: '/role/deleteRole',
    method: 'DELETE',
    data: {
      id
    }
  })
}