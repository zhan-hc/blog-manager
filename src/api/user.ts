import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getUserList = (params?: any) => {
  return MyRequest.request({
    url: '/user/getUsers',
    method: 'GET',
    params
  })
}

export const updateUser = (data: any) => {
  return MyRequest.request({
    url: '/user/updateUser',
    method: 'POST',
    data
  })
}

export const deleteUser = (id: number) => {
  return MyRequest.request({
    url: '/user/deleteUser',
    method: 'DELETE',
    data: {
      id
    }
  })
}