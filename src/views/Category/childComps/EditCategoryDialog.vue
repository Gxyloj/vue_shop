<template>
  <div>
    <el-dialog v-model="EditCategoryVisible"
               title="编辑分类"
               width="30%">
      <el-form ref="EditCategoryFormRef"
               :model="editCategoryForm"
               :rules="editCategoryRules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model.lazy="editCategoryForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="this.EditCategoryVisible = false">取消</el-button>
        <el-button type="primary" @click="editCategory">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {editCategory} from "@/network/Category";
import {ElMessage} from "element-plus";

export default {
  name: "EditCategoryDialog",
  props: {
    editCategoryForm1: {
      type: Object
    }
  },
  data() {
    return {
      EditCategoryVisible: false,
      editCategoryRules: {
        cat_name: {required: true, message: "请输入分类名称", trigger: 'blur'}
      },
      editCategoryForm: {},
    }
  },
  // created() {
  //   this.$nextTick(() => {
  //     this.editCategoryForm = JSON.parse(JSON.stringify(this.editCategoryForm1))
  //   })
  // },
  updated() {
    this.editCategoryForm = JSON.parse(JSON.stringify(this.editCategoryForm1))
  },
  // watch: {
  //   EditCategoryVisible() {
  //     this.editCategoryForm = JSON.parse(JSON.stringify(this.editCategoryForm1))
  //
  //   }
  // },
  methods: {
    editCategory() {
      editCategory(this.editCategoryForm).then(res => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.EditCategoryVisible = false
        this.$emit('updateList')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
