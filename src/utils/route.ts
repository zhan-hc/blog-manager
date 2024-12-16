import { routes } from "@/router"
import router from '@/router'
import { Local } from "./local"
import { MENU_KEY } from "@/constants"
import { useCommonStore } from "@/store/common"
// 匹配对应路由
export const matchRoutes = (routerArr: Array<any>) => {
  const newMenu = routerArr.filter(item => item.menu_url).map(item => item.menu_url.split('*')[0])
  const routeList:any = []
  newMenu.length && routes.forEach(item => {
    if (item.path && newMenu.some(menu => item.path.includes(menu))) {
      routeList.push(item)
    }
    if (item.children) {
      const subRouter = item.children.filter(route => newMenu.some(menu => route.path.includes(menu)) || route.name === 'Home')
      routeList.push({
        ...item,
        children: subRouter
      })
    }
  })
  return routeList
}

// 添加路由
export const addPageToRouter = () => {
  const { updateRouterStatus } = useCommonStore()
  const routerArr = matchRoutes(Local.get(MENU_KEY) || [])
  routerArr.forEach((item: any) => {
    router.addRoute(item)
    if (item.children) {
      item.children.forEach((child: any) => {
        router.addRoute(item.name, child)
      })
    }
  })
  updateRouterStatus(true)
}

// 只匹配两层菜单
export const getMenuToTree = (routerArr: any) => {
  const menuObj: any = {}
  // 过滤出菜单类型的数据
  routerArr.filter((item: any) => item.menu_type === 301).forEach((item: any) => {
    if (!item.parent_menu_id) {
      menuObj[item.menu_id] = item
    } else if (menuObj[item.parent_menu_id]) {
      if (!menuObj[item.parent_menu_id].children) {
        menuObj[item.parent_menu_id].children = []
      }
      menuObj[item.parent_menu_id].children.push(item)
    }
  })
  return Object.keys(menuObj).map(item => menuObj[item]).sort((a, b) => {
    return b.menu_priority - a.menu_priority
  })
}