<template>
  <el-container>
    <el-header>
      <div class="left">
        <span>后台博客管理系统</span>
      </div>
      <div class="right">
        <el-icon><setting /></el-icon>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="/" class="el-menu-vertical-demo" router>
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/user">个人信息管理</el-menu-item>
          <el-sub-menu index="2">
            <template #title>文章管理</template>
            <el-menu-item index="/article">内容管理</el-menu-item>
            <el-menu-item index="/category">分类管理</el-menu-item>
            <el-menu-item index="/tag">标签管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/nav">导航管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
import { Setting } from "@element-plus/icons-vue";
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
}
  .main-container {
    height: calc(100vh - 60px);
    .el-aside {
      color: #333;
    }
  }
</style>