<template>
  <div>
    <el-table :data="userList" border stripe >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态" width="80px">
        <template v-slot="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-tooltip content="编辑角色" :enterable="false">
            <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :currentPage="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props:{
    userList:{
      type:Array
    },
    queryInfo:{
      type:Object
    },
    total:{
      type:Number
    }
  },
  methods:{
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.$emit('handleSizeChange',this.queryInfo)
    },
    handleCurrentChange(newPage){
      // console.log(newPage);
      this.queryInfo.pagenum = newPage
      this.$emit('handleCurrentChange',this.queryInfo)
    },
    userStateChange(userinfo){
      // console.log(userinfo);
      this.$emit('userStateChange',userinfo)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table,
.el-pagination{
  margin-top: 15px;
}

</style>
