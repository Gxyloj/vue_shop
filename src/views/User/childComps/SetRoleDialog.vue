<template>
  <div>
    <el-dialog v-model="setRoleVisible"
               title="分配角色"
               width="30%"
               @close="this.selectRoleID = ''">
      <p>当前的用户名：{{currentUser.username}}</p>
      <p>当前的角色：{{currentUser.role_name}}</p>
      <span>分配新的角色</span>
      <el-select v-model="selectRoleID" placeholder="分配角色">
        <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
        >
        </el-option>
      </el-select>
      <template #footer>
        <el-button @click="this.setRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="allotRole">确定</el-button>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import {getRolesList} from "@/network/Power";
import {allotRole} from "@/network/User";
import {ElMessage} from "element-plus";

export default {
  name: "SetRoleDialog",
  props:{
    currentUser:{
      type:Object
    }
  },
  data(){
    return {
      setRoleVisible:false,
      rolesList:[],
      selectRoleID:''
    }
  },
  created(){
    this.getRolesList()
  },
  methods:{
    getRolesList(){
      getRolesList().then(res => {
        this.rolesList = res.data
      })
    },
    allotRole(){
      allotRole(this.currentUser.id,this.selectRoleID).then(res => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        this.setRoleVisible = false
        ElMessage.success(res.meta.msg)
        this.$emit('updateList')
      })
    }
  }
}
</script>

<style scoped>
.el-select{
  margin-left: 10px;
}
</style>
