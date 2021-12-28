<template>
  <div>
    <el-table :data="roleList" stripe border>
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="290px">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRole(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "RolesList",
  props:{
    roleList:{
      type:Array
    }
  },
  methods:{
    editRole(id){
      this.$emit('editRole',id)
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
