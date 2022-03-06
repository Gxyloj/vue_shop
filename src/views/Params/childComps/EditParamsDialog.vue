<template>
  <div>
    <el-dialog v-model="editParamsVisible"
               :title="`修改${this.editParamsDialogTitle}`"
               width="50%">
      <el-form :model="editParamsForm"
               :rules="editParamsRules">
        <el-form-item :label="this.editParamsDialogTitle"
                      prop="attr_name">
          <el-input v-model="editParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="this.addParamsVisible = false">取消</el-button>
        <el-button type="primary" @click="editParamsRequest">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {editParams} from "@/network/Category";
import {ElMessage} from "element-plus";

export default {
  name: "EditParamsDialog",
  data() {
    return {
      editParamsVisible: false,
      editParamsDialogTitle: '动态参数',
      editParamsForm: {
        cat_id: null,
        attr_id: null,
        attr_name: '',
        attr_sel: 'many',
        attr_vals: '',
      },
      editParamsRules: {
        attr_name: {required: true, message: `请输入参数`, trigger: 'blur'}
      }

    }
  },
  methods: {
    editParamsRequest() {
      editParams(this.editParamsForm).then(res => {
        // console.log(res);
        if (res.meta.status !== 200) {
          return ElMessage.error(res.meta.msg)
        } else {
          ElMessage.success(res.meta.msg)
          this.editParamsVisible = false
          // this.$emit('updateParamsList')
          this.$bus.$emit("updateParamsListBus")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
