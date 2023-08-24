<template>
  <el-container>
    <el-header>
      <div class="left">
        <span>后台博客管理系统</span>
      </div>
      <div class="right">
        <span v-if="user_name" style="margin-right: 10px;">{{ user_name }}</span>
        <el-dropdown>
          <img v-if="avatar_url" :src="avatar_url" alt="" width="28" height="28" style="border-radius: 50%;" />
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
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/user">个人信息管理</el-menu-item>
          <el-sub-menu index="2">
            <template #title >文章管理</template>
            <el-menu-item index="/article">内容管理</el-menu-item>
            <el-menu-item index="/category">分类管理</el-menu-item>
            <el-menu-item index="/tag">标签管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>快捷导航管理</template>
            <el-menu-item index="/navLink">导航链接管理</el-menu-item>
            <el-menu-item index="/navType">导航类型管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
  import useRouter from '@/hook/common/useRouter'
  import { Local } from "@/utils/local"

  const { routerGo } = useRouter()
  const { avatar_url = '', user_name = '', user_id = '' } = Local.get('userInfo') || {}
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