<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <RolesList :roleList="roleList"
                 @editRole="editRole"/>
    </el-card>
    <AddRoleDialog ref="AddRoleDialogRef"
                   @updateRoleList="getRolesList"/>
    <EditRoleDialog ref="EditRoleDialogRef"
                    :editRoleForm="editRoleForm"
                    @updateRoleList="getRolesList"/>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import {getRolesList, selectRoleID} from "@/network/Power";
import {ElMessage} from "element-plus";
import AddRoleDialog from "@/views/Power/childComps/AddRoleDialog";
import RolesList from "@/views/Power/childComps/RolesList";
import EditUserDialog from "@/views/User/childComps/EditUserDialog";
import EditRoleDialog from "@/views/Power/childComps/EditRoleDialog";

export default {
  name: "Roles",
  components: {EditRoleDialog, EditUserDialog, RolesList, AddRoleDialog, BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '权限管理', '角色列表'],
        path: ['/home']
      },
      roleList: [],
      editRoleForm: {

      },
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    getRolesList() {
      getRolesList().then(res => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        // ElMessage.success(res.meta.msg)
        this.roleList = res.data
      })
    },
    addRole() {
      this.$refs.AddRoleDialogRef.addRoleVisible = true
    },
    editRole(id){
      this.$refs.EditRoleDialogRef.editRoleVisible = true
      selectRoleID(id).then(res => {
        this.editRoleForm = res.data
      })
    }

  }
}
</script>

<style scoped>

</style>
