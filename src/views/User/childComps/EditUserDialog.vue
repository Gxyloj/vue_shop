<template>
  <div>
    <el-dialog v-model="editUserVisible"
               title="编辑用户"
               width="50%"
               @close="editDialogClose">
      <!--      主体-->
      <el-form ref="EditUserFormRef"
               :model="editForm"
               label-width="80px"
               :rules="editUserRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!--      底部-->
      <template #footer>
        <el-button type="info">取消</el-button>
        <el-button type="primary" @click="editUser">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {checkEmail, checkMobile} from "@/common/utlis";
import {editUser} from "@/network/User";
import {ElMessage} from "element-plus";

export default {
  name: "EditUserDialog",
  props: {
    editForm: {
      type: Object
    }
  },
  data() {
    return {
      editUserVisible: false,
      editUserRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    editDialogClose() {
      this.$refs.EditUserFormRef.resetFields()
    },
    editUser(){
      this.$refs.EditUserFormRef.validate(valid => {
        if(!valid) return
        // console.log('发送请求');
        // console.log(this.editForm);
        editUser(this.editForm).then(res => {
          // console.log(res);
          if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
          this.editUserVisible = false
          ElMessage.success(res.meta.msg)
          this.$emit('updateList')
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
