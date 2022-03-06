<template>
  <div>
    <el-dialog v-model="addParamsVisible"
               :title="`添加${addParamsDialogTitle}`"
               width="50%"
               @close="closeAddParamsDialog">
      <el-form :model="addParamsForm"
               :rules="addParamsRules">
        <el-form-item :label="addParamsDialogTitle" prop="attr_name">
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeAddParamsDialog">取消</el-button>
        <el-button type="primary" @click="addParamsRequest">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {addParams} from "@/network/Category";
import {ElMessage} from "element-plus";

export default {
  name: "AddParamsDialog",
  data() {
    return {
      addParamsVisible: false,
      addParamsDialogTitle: '',
      addParamsForm: {
        cat_id: null,
        attr_name: '',
        attr_sel: 'many',
        attr_vals: ''
      },
      addParamsRules: {
        attr_name: {required: true, message: '请输入参数名称', trigger: 'blur'}
      },

    }
  },
  methods: {
    addParamsRequest() {
      addParams(this.addParamsForm).then(res => {
        // console.log(res);
        if (res.meta.status !== 201) {
          ElMessage.error(res.meta.msg)
        } else {
          ElMessage.success(res.meta.msg)
          this.addParamsVisible = false
          this.$emit('updateParamsList')
          this.addParamsForm = {
            cat_id: null,
            attr_name: '',
            attr_sel: 'many',
            attr_vals: ''
          }
        }
      })
    },
    closeAddParamsDialog() {
      this.addParamsVisible = false
      this.addParamsForm = {
        cat_id: null,
        attr_name: '',
        attr_sel: 'many',
        attr_vals: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
