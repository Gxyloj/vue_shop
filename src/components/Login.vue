<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form class="login_form"
               :model="loginForm"
               :rules="loginFormRule"
               ref="loginFormRef">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-wode"
                    v-model="loginForm.username">
            <!--            <template #prefix>-->
            <!--              <el-icon><user-filled /></el-icon>-->
            <!--            </template>-->
          </el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-tianchongxing-"
                    v-model="loginForm.password"
                    show-password>
          </el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import {loginRequest} from '@/network/login'
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      // 登录表单
      loginForm: {
        username: '1111111',
        password: '1111111'
      },
      // 表单验证
      loginFormRule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this.$refs.loginFormRef.resetFields())
      this.$refs.loginFormRef.resetFields()

    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return
        loginRequest(this.loginForm).then(res => {
          if (res.meta.status !== 200) return ElMessage.error('登录失败')
          ElMessage({
            message: '登录成功',
            type: 'success'
          })

        })
      })


    }
  }
}
</script>


<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  img {
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
  float: right;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
