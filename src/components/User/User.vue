<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              clearable
              @clear="getUserList"
          >
            <template #append>
              <el-button @click="getUserList">
                <el-icon>
                  <search/>
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="this.$refs.AddUserDialog.addDialogVisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <UserList :userList="userList"
                :queryInfo="queryInfo"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                @userStateChange="userStateChange"></UserList>
    </el-card>
    <AddUserDialog ref="AddUserDialog"/>
  </div>
</template>

<script>
import {getUserList, setUserState} from "@/network/User";
import {ElMessage} from "element-plus";
import UserList from "@/components/User/UserList";
import AddUserDialog from "@/components/User/AddUserDialog";

export default {
  name: "User",
  components: {AddUserDialog, UserList},
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible:false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserList(this.queryInfo).then(res => {
        console.log(res);
        if (res.meta.status !== 200) return ElMessage.error('获取用户列表失败')
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    handleSizeChange() {
      this.getUserList()
    },
    handleCurrentChange() {
      this.getUserList()
    },
    userStateChange(userinfo) {
      // console.log(userinfo);
      setUserState(userinfo).then(res => {
        console.log(res);
        if (res.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state
          return ElMessage.error('设置失败')
        }
        ElMessage.success('设置成功')
      })
    },
  }
}
</script>

<style scoped>

</style>
