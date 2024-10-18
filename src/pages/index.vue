<template>
  <el-container>
    <el-header>
      <div class="left">
        <span>后台博客管理系统</span>
      </div>
      <div class="right">
        <el-dropdown>
          <div v-if="user_name" style="display: flex;align-items: center;">
            <span style="margin-right: 10px;font-weight: bold;">{{ user_name }}</span>
            <img v-if="avatar_url" :src="avatar_url" alt="" width="28" height="28" style="border-radius: 50%;" />
          </div>
          <div v-else>未登录</div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">{{user_id ? '退出登录' : '登录'}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="/" class="el-menu-vertical-demo" router>
          <template v-for="item in menuList" :key="item.menu_id">
            <el-menu-item v-if="!item.children" :index="item.menu_url">
              {{ item.menu_name }}
            </el-menu-item>
            <el-sub-menu v-else-if="item?.children.length > 0" :index="`${item.menu_id}`">
              <template #title>{{ item.menu_name }}</template>
              <el-menu-item v-for="submenu in item.children" :key="submenu.menu_id" :index="submenu.menu_url">{{ submenu.menu_name }}</el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
import { MENU_KEY } from '@/constants'
import useRouter from '@/hook/common/useRouter'
import { Local } from "@/utils/local"
import { getMenuToTree } from "@/utils/route";

  const { routerGo } = useRouter()
  const { avatar_url = '', user_name = '', user_id = '' } = Local.get('userInfo') || {}
  const menuList = ref([])

  onMounted(() => {
    const menuData = Local.get(MENU_KEY) || []
    menuList.value = getMenuToTree(menuData)
  })
  const logout = () => {
    Local.clear()
    routerGo('/login')
  }
</script>

<style scoped lang='scss'>
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #B3C0D1;
  line-height: 60px;
  .left {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
  .main-container {
    height: calc(100vh - 60px);
    .el-aside {
      color: #333;
    }
  }
</style>