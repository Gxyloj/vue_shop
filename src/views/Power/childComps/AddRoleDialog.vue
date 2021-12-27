<template>
  <div>
    <el-dialog
        v-model="addRoleVisible"
        title="添加角色"
        width="50%">
      <el-form :model="addRoleForm"
               :rules="addRoleFormRules"
               ref="AddRoleFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetRoleForm">重置</el-button>
        <el-button type="info" @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole">
          确定
        </el-button>

      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {addRole} from "@/network/Power";
import {ElMessage} from "element-plus";

export default {
  name: "AddRoleDialog",
  data() {
    return {
      addRoleVisible: false,
      addRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      addRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetRoleForm() {
      this.addRoleForm = {
        roleName: '',
        roleDesc: ''
      }
      this.$refs.AddRoleFormRef.resetFields()
    },
    addRole(){
      this.$refs.AddRoleFormRef.validate(valid => {
        if (!valid) return
        addRole(this.addRoleForm).then(res => {
          if (res.meta.status !== 201) return ElMessage.error(res.meta.msg)
          this.addRoleVisible = false
          ElMessage.success(res.meta.msg)
          this.resetRoleForm()
          this.$emit('updateRoleList')
        })
      })
    }
  },


}
</script>

<style lang="less" scoped>

</style>
