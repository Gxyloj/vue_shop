<template>
  <div>
    <el-table :data="paramsData" row-key="attr_id" stripe border>
      <el-table-column type="expand">
        <template v-slot="scope">
          <!--          {{scope.row.attr_vals.split(',')}}-->
          <!--          {{ scope.row }}-->
          <!--          动态参数-->
          <div v-show="scope.row.attr_sel === 'many'">
            <el-tag v-for="item in scope.row.attr_vals.split(',')" closable>
              {{ item }}
            </el-tag>
          </div>
          <!--          静态属性-->
          <div v-show="scope.row.attr_sel === 'only'">
            <el-tag v-for="item in scope.row.attr_vals.split(' ')" closable>
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column type='' label="参数名称" prop="attr_name"></el-table-column>
      <el-table-column type='' label="操作" width="300px">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editParams(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteParams(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditParamsDialog ref="EditParamsDialogRef"/>
  </div>
</template>

<script>
import {deleteParams} from "@/network/Category";
import {ElMessage, ElMessageBox} from "element-plus";
import EditParamsDialog from "@/views/Params/childComps/EditParamsDialog";

export default {
  name: "DataTable",
  components: {EditParamsDialog},
  props: {
    paramsData: {
      type: Array
    }
  },
  data() {
    return {
      // paramsData:{},

    }
  },
  methods: {
    deleteParams(data) {
      // console.log(data);
      ElMessageBox.confirm(
          '是否确认删除参数',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        deleteParams(data).then(res => {
          // console.log(res);
          if (res.meta.status !== 200) {
            ElMessage.error(res.meta.msg)
          } else {
            ElMessage.success(res.meta.msg)
            this.$emit('updateParamsList')
          }
        })
      }).catch(() => {
        ElMessage({
          type:'info',
          message:'操作取消'
        })
      })

    },
    editParams(paramsData){
      this.$refs.EditParamsDialogRef.editParamsVisible = true
      if (this.paramsData[0].attr_sel === 'many'){
        // console.log('动态')
        this.$refs.EditParamsDialogRef.editParamsDialogTitle = "动态参数"
      }else
        this.$refs.EditParamsDialogRef.editParamsDialogTitle = "静态属性"
      // console.log(paramsData);
      // this.$refs.EditParamsDialogRef.editParamsForm = paramsData
      this.$refs.EditParamsDialogRef.editParamsForm.cat_id = paramsData.cat_id
      this.$refs.EditParamsDialogRef.editParamsForm.attr_id = paramsData.attr_id
      this.$refs.EditParamsDialogRef.editParamsForm.attr_name = paramsData.attr_name
      this.$refs.EditParamsDialogRef.editParamsForm.attr_sel = paramsData.attr_sel
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-right: 15px;
}
</style>
