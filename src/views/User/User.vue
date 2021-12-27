<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
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
          <el-button type="primary" @click="this.$refs.AddUserDialogRef.addDialogVisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <UserList :userList="userList"
                :queryInfo="queryInfo"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                @userStateChange="userStateChange"
                @editUser="editUser"
                @deleteUser="deleteUser">

      </UserList>
    </el-card>

    <!--FIXME 爷孙通信-->
    <AddUserDialog ref="AddUserDialogRef"
                   @updateList="getUserList"/>
    <EditUserDialog ref="EditUserDialogRef"
                    :editForm="editForm"
                    @updateList="getUserList"/>
  </div>
</template>

<script>
import {deleteUser, getUserList, selectID, setUserState} from "@/network/User";
import {ElMessage, ElMessageBox} from "element-plus";
import UserList from "@/views/User/childComps/UserList";
import AddUserDialog from "@/views/User/childComps/AddUserDialog";
import EditUserDialog from "@/views/User/childComps/EditUserDialog";
import BreadCrumbs from "@/components/commom/BreadCrumbs";

export default {
  name: "User",
  components: {BreadCrumbs, EditUserDialog, AddUserDialog, UserList},
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      navTitle:{
        title:['首页','用户管理','用户列表'],
        path: ['/home']
      },
      userList: [],
      total: 0,
      addDialogVisible:false,
      //保存根据ID查询到的用户信息
      editForm:[],
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserList(this.queryInfo).then(res => {
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
    editUser(id){
      selectID(id).then(res => {
        this.editForm = res.data
      })
      this.$refs.EditUserDialogRef.editUserVisible = true
    },
    deleteUser(id){
      // console.log(id)
      ElMessageBox.confirm(
          '这将永久删除用户，是否确定删除',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            deleteUser(id).then(res => {
              if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
              ElMessage({
                type: 'success',
                message: res.meta.msg,
              })
              this.getUserList()
            })

          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '操作取消',
            })
          })
    }

  }
}
</script>

<style scoped>

</style>
