import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getRole()
*/
export const getDictList = (params?: any) => {
  return MyRequest.request({
    url: '/dict/dictList',
    method: 'GET',
    params
  })
}
export const getDictTypeList = (params?: any) => {
  return MyRequest.request({
    url: '/dict/dictTypeList',
    method: 'GET',
    params
  })
}

export const addDictType = (data: any) => {
  return MyRequest.request({
    url: '/dict/addDictType',
    method: 'POST',
    data
  })
}

export const updateDictType = (data: any) => {
  return MyRequest.request({
    url: '/dict/updateDictType',
    method: 'POST',
    data
  })
}

export const deleteDictType = (id: number) => {
  return MyRequest.request({
    url: '/dict/deleteDictType',
    method: 'DELETE',
    data: {
      id
    }
  })
}
export const addDictValue = (data: any) => {
  return MyRequest.request({
    url: '/dict/addDictValue',
    method: 'POST',
    data
  })
}

export const updateDictValue = (data: any) => {
  return MyRequest.request({
    url: '/dict/updateDictValue',
    method: 'POST',
    data
  })
}

export const deleteDictValue = (id: number) => {
  return MyRequest.request({
    url: '/dict/deleteDictValue',
    method: 'DELETE',
    data: {
      id
    }
  })
}