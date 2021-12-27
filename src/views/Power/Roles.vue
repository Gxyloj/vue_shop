<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <RolesList :roleList="roleList"/>
    </el-card>
    <AddRoleDialog ref="AddRoleDialogRef"
                   @updateRoleList="getRolesList"/>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import {getRolesList} from "@/network/Power";
import {ElMessage} from "element-plus";
import AddRoleDialog from "@/views/Power/childComps/AddRoleDialog";
import RolesList from "@/views/Power/childComps/RolesList";

export default {
  name: "Roles",
  components: {RolesList, AddRoleDialog, BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '权限管理', '角色列表'],
        path: ['/home']
      },
      roleList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    getRolesList() {
      getRolesList().then(res => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.roleList = res.data
      })
    },
    addRole() {
      this.$refs.AddRoleDialogRef.addRoleVisible = true
    },

  }
}
</script>

<style scoped>

</style>
