<template>
    <div class="login-container">
        <div class="login-card" :class="{ 'login-card--shake': quiver }">
            <div class="form-box">
                <div class="title">
                    <img class="logo" src="/logo.svg" alt="" />
                    <h2>博客后台</h2>
                </div>
                <div class="label">
                    <h2>Login</h2>
                </div>
                <el-form ref="loginForm" :model="formData" :rules="formRule">
                    <el-form-item prop="username">
                        <el-input placeholder="用户名" v-model="formData.username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码" v-model="formData.password" type="password" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin" @keyup.enter="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="img-box">
                <img class="img" src="@/assets/image/login-card-img.png" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLoginForm from "@/hook/form/useLoginForm";
const { formData, formRule, loginForm, quiver, handleLogin } = useLoginForm();
</script>

<style scoped lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    .login-card {
        display: flex;
        // width: 300px;
        backdrop-filter: blur(10px) saturate(150%);
        background: rgba(255, 255, 255, 0.6); 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        overflow: hidden;
        &--shake {
            animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            transform: translate3d(0, 0, 0);
            @keyframes shake {
                10%,
                90% {
                    transform: translate3d(-2px, 0, 0);
                }
                20%,
                80% {
                    transform: translate3d(4px, 0, 0);
                }
                30%,
                50%,
                70% {
                    transform: translate3d(-6px, 0, 0);
                }
                40%,
                60% {
                    transform: translate3d(6px, 0, 0);
                }
            }
        }
        .form-box {
            display: flex;
            flex-direction: column;
            width: 350px;
            box-sizing: border-box;
            padding: 30px;
            .title {
                display: flex;
                align-items: center;
                color: #1296db;
                .logo {
                    width: 30px;
                    margin-right: 10px;
                }
            }
            .label {
                margin-bottom: 40px;
            }
            :deep(.el-input) {
                .el-input__wrapper {
                    background-color: #f6f6f6;
                    box-shadow: none;
                    padding: 5px 11px;
                }
            }
            .el-button {
                width: 90%;
                margin: 0 auto;
                margin-top: 50px;
            }
        }
        .img-box {
            width: 600px;
            height: 600px;

            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
