import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getProjectList = (params?: any) => {
  return MyRequest.request({
    url: '/project/getProjectList',
    method: 'GET',
    params
  })
}

export const addProject = (data: any) => {
  return MyRequest.request({
    url: '/project/addProject',
    method: 'POST',
    data
  })
}

export const updateProject = (data: any) => {
  return MyRequest.request({
    url: '/project/updateProject',
    method: 'POST',
    data
  })
}

export const deleteProject = (id: number) => {
  return MyRequest.request({
    url: '/project/deleteProject',
    method: 'DELETE',
    data: {
      id
    }
  })
}