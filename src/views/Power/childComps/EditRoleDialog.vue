<template>
  <div>
    <el-dialog v-model="editRoleVisible"
               title="编辑角色"
               width="50%"
               @close="editRoleDialogClose">
      <!--      主体-->
      <el-form ref="EditRoleFormRef"
               :model="editRoleForm"
               :rules="editRoleFormRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info" @click="this.editRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="editRole">确认</el-button>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import {editRole} from "@/network/Power";
import {ElMessage} from "element-plus";

export default {
  name: "EditRoleDialog",
  props:{
    editRoleForm:{
      type:Object
    }
  },
  data() {
    return {
      editRoleVisible: false,
      editRoleFormRules:{
        roleName:[
          {required:true,message:'请输入角色名称',trigger:'blur'}
        ],
        roleDesc:[
          {required:true,message:'请输入角色描述',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    editRoleDialogClose(){
      this.$refs.EditRoleFormRef.resetFields()
    },
    editRole(){
      editRole(this.editRoleForm).then(res => {
        if (res.meta.status !== 200) return ElMessage.error('修改失败')
        this.editRoleVisible = false
        ElMessage.success('修改成功')
        this.$emit('updateRoleList')
      })
    }
  }
}
</script>

<style scoped>

</style>
