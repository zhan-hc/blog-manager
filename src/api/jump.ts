import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getTypes = () => {
  return MyRequest.request({
    url: '/jump/getTypes',
    method: 'GET'
  })
}
export const getJumpTypes = (params: any) => {
  return MyRequest.request({
    url: '/jump/getJumpList',
    method: 'GET',
    params
  })
}
export const addJump = (data: any) => {
  return MyRequest.request({
    url: '/jump/addJump',
    method: 'POST',
    data
  })
}

export const updateJump = (data: any) => {
  return MyRequest.request({
    url: '/jump/updateJump',
    method: 'POST',
    data
  })
}

export const deleteJump = (id: number) => {
  return MyRequest.request({
    url: '/jump/deleteJump',
    method: 'DELETE',
    data: {
      id
    }
  })
}