import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/

export const getMenus = () => {
  return MyRequest.request({
    url: '/menu/getMenuList',
    method: 'POST'
  })
}