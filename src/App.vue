<script setup lang="ts">
</script>

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
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>个人信息管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>导航管理</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
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
