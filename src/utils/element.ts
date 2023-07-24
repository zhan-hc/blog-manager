// 按需引入elementui组件
import { ElContainer, ElIcon, ElMenu, ElMenuItem, ElMain, ElAside } from 'element-plus'
import { App } from 'vue'
const comList = [
  ElContainer,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElMain,
  ElAside
]
const element = {
  install: (Vue: App<Element>) => {
    comList.forEach(item => Vue.use(item))
  }
}
export default element