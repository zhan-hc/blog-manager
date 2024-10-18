<template>
  <div class="home-container">
    <h1>欢迎{{ user_name }}来到前端笨鸟的后台博客管理系统</h1>
  </div>
</template>

<script lang='ts' setup>
import { Local } from "@/utils/local"
const { user_name = ''} = Local.get('userInfo') || {}
</script>

<style scoped lang='scss'>
</style>