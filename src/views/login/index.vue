<script setup>
import { useRouter } from 'vue-router'
import service from '@/utils/request'
import { setToken } from '@/utils/useStorage'

const router = useRouter()
const loginForm = reactive({ name: '', password: '' })
const loading = ref(false)

async function login() {
  loading.value = true
  const { name, password } = loginForm
  if (!name || !password) {
    ElMessage.error('请输入用户名和密码')
    loading.value = false
    return
  }
  setTimeout(async () => {
    try {
      loading.value = true
      const result = await service.post('/auth/login', loginForm)

      const res = result.data
      if (res.code === 0) {
        ElMessage({
          message: '登陆成功',
          type: 'success',
        })
        setToken(res.data.token)
        router.push('/')
      }
      else {
        ElMessage({
          message: res.message,
          type: 'warning',
        })
      }
    }
    catch (error) {
      ElMessage.error(error.message)
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="login">
    <div v-loading="loading" class="login-box">
      <h1>Vue-ElementPlus</h1>
      <p class="version">
        Version 1.0.0
      </p>
      <el-form class="form">
        <el-input
          #prepend
          v-model="loginForm.name"
          size="large"
          placeholder="admin或editor"
          type="text"
          maxlength="50"
        >
          <el-icon>
            <User />
          </el-icon>
        </el-input>
        <el-input
          ref="password"
          #prepend
          v-model="loginForm.password"
          size="large"
          placeholder="密码随便输"
          name="password"
          maxlength="50"
          show-password
        >
          <el-icon>
            <Lock />
          </el-icon>
        </el-input>
        <el-button
          size="large"
          type="primary"
          style="width: 100%"
          @click="login()"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #9e9e9e;
  align-items: center;

  .login-box {
    width: 500px;
    background: white;
    border-radius: 8px;
    height: 440px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);

    h1 {
      margin-top: 38px;
      text-align: center;
    }

    .version {
      margin-top: 0;
      color: #222;
      font-size: 14px;
    }

    .form {
      width: 80%;
      margin: 40px auto 15px;

      .el-input {
        margin-bottom: 28px;
      }

      .eye {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .password-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: #409eff;
        }
      }
    }
  }
}
</style>
