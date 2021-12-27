<template>
  <el-dialog
      v-model="addDialogVisible"
      title="添加用户"
      width="50%"
  >
    <!--    主体-->
    <el-form :model="addForm"
             :rules="addFormRules"
             label-width="80px"
             ref="addFormRef"
             :status-icon="true">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!--    底部按钮-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetAddForm">重置</el-button>
        <el-button type="info" @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">
          确定
        </el-button>

      </span>
    </template>
  </el-dialog>
</template>

<script>
import {addUser} from "@/network/User";
import {checkEmail, checkMobile} from "@/common/utlis";
import {ElMessage} from "element-plus";
import Login from "@/views/Login";

export default {
  name: "AddUserDialog",
  data() {
    return {
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 邮箱规则

    }
  },
  props: {},
  methods: {
    resetAddForm() {
      this.addForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        // console.log(valid);
        if (!valid)
          return
        addUser(this.addForm).then(res => {
          if (res.meta.status !== 201) {
            return ElMessage.error(res.meta.msg)
            // console.log(res.meta.msg)
          }
          this.addDialogVisible = false
          ElMessage.success('添加成功')
          this.resetAddForm()
          this.$emit('updateList')
        })
      })

    }
  }
}
</script>

<style scoped>

</style>
