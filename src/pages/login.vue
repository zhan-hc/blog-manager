<template>
  <div class="login-container">
    <div class="login-card">
      <h2>博客后台管理系统</h2>
      <el-form 
        ref="loginForm"
        :model="formData"
        :rules="formRule"
        label-width="80px"
      >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import useLoginForm from '@/hook/form/useLoginForm'
const { formData, formRule, loginForm, handleLogin } = useLoginForm()
</script>

<style scoped lang='scss'>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    .login-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      width: 300px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
    }
  }
</style>