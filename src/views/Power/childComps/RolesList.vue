<template>
  <div>
    <el-table :data="roleList" row-key="id" stripe border>
      <el-table-column type="expand">
        <template v-slot="scope">

          <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id"
                  :class="['bdbottom',i1 === 0 ? 'bdtop':'','vcenter']">
            <el-col :span="5" >
              <el-tag closable
                      @close="removeRights(scope.row,item1.id)">
                {{ item1.authName }}
              </el-tag>
              <el-icon>
                <caret-right/>
              </el-icon>
            </el-col>
            <el-col :span="19">
              <el-row v-for="(item2,i2) in item1.children" :key="item2.id"
                      :class="[i2 === 0 ? '':'bdtop','vcenter']">
                <el-col :span="6">
                  <el-tag type="success"
                          closable
                          @close="removeRights(scope.row,item2.id)">
                    {{ item2.authName }}
                  </el-tag>
                  <el-icon>
                    <caret-right/>
                  </el-icon>
                </el-col>
                <el-col :span="18" >
                  <el-tag v-for="(item3,i3) in item2.children"
                          :key="item3.id"
                          type="warning"
                          closable
                          @close="removeRights(scope.row,item3.id)">
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column type='' label="角色名称" prop="roleName"></el-table-column>
      <el-table-column type='' label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column type='' label="操作" width="290px">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRole(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRights(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <SetRightsDialog ref="SetRightsDialogRef" @updateRoleList="this.$emit('updateRoleList')"
                     :roleID="roleID"
                     :rightsList="rightsList"
                     :defKeys="defKeys"/>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteRole, getRightsList, getRolesList, removeRights} from "@/network/Power";
import SetRightsDialog from "@/views/Power/childComps/SetRightsDialog";

export default {
  name: "RolesList",
  components: {SetRightsDialog},
  props: {
    roleList: {
      type: Array
    }
  },
  data(){
    return{
      rightsList:[],
      //保存已选中权限的ID
      defKeys:[],
      //要编辑的角色的ID
      roleID:0
    }
  },
  methods: {
    editRole(id) {
      this.$emit('editRole', id)
    },
    deleteRole(id) {
      // console.log(id);
      ElMessageBox.confirm(
          '这将永久删除角色，是否确定删除',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            deleteRole(id).then(res => {
              if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
              ElMessage({
                type: 'success',
                message: res.meta.msg,
              })
              this.$emit('updateRoleList')
            })

          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '操作取消',
            })
          })
    },
    removeRights(role,rightsID){
      ElMessageBox.confirm(
          '是否取消该权限',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            removeRights(role.id,rightsID).then(res => {
              if (res.meta.status !== 200 ) return ElMessage.error(res.meta.msg)
              ElMessage.success(res.meta.msg)
              // this.$emit('updateRoleList')
              // 会重新渲染
              role.children = res.data
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '操作取消',
            })
          })
    },
    setRights(role){
      //先将保存选中的权限ID数组清空
      this.defKeys = []
      getRightsList('tree').then(res => {
        if (res.meta.status !== 200) return ElMessage.error('请求失败')
        this.rightsList = res.data
        this.getLeafKey(role,this.defKeys)
        this.roleID = role.id
        this.$refs.SetRightsDialogRef.setRightsVisible = true
      })

    },
    //递归获取到三级权限的id并保存
    //TODO 理解递归操作
    getLeafKey(node,arr){
      if (!node.children){
        return arr.push(node.id)
      }

      node.children.forEach(item => {
        this.getLeafKey(item,arr)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter{
  display: flex;
  align-items: center;
}
</style>
