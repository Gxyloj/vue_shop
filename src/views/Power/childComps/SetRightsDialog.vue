<template>
  <div>
    <el-dialog v-model="setRightsVisible"
               title="分配权限"
               width="50%"
               >
      <el-tree ref="RightsTreeRef"
               :data="rightsList"
               :props="treeProps"
               show-checkbox
               default-expand-all
               node-key="id"
               :default-checked-keys="defKeys">

      </el-tree>
      <template #footer>
        <el-button @click="this.setRightsVisible = false">取消</el-button>
        <el-button @click="allotRights" type="primary">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {roleAuthorization} from "@/network/Power";
import {ElMessage} from "element-plus";

export default {
  name: "setRightsDialog",
  data(){
    return {
      setRightsVisible:false,
      //树形空间属性绑定
      treeProps:{
        children:'children',
        label:'authName'
      },
      //默认选中的节点ID值

    }
  },
  props:{
    rightsList:{
      type:Array
    },
    defKeys:{
      type:Array
    },
    roleID:{
      type:Number
    }
  },
  methods:{
    //分配权限
    allotRights(){
      const keys = [
          ...this.$refs.RightsTreeRef.getCheckedKeys(),
          ...this.$refs.RightsTreeRef.getHalfCheckedKeys()
      ]

      roleAuthorization(this.roleID,keys.join(',')).then(res => {
        if (res.meta.status !== 200 )return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.setRightsVisible = false
        this.$emit('updateRoleList')
      })
    }
  }
}
</script>

<style scoped>

</style>
