<template>
  <div>
    <el-dialog v-model="addCategoryVisible"
               title="添加分类"
               width="50%">
      <el-form :model="addCategoryForm"
               :rules="addCategoryRules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategoryForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" style="margin-left: 12px">
          <el-cascader :options="parentCategoryList"
                       clearable
                       :props="cascaderProps"
                       v-model="selectedKeys"
                       @change="parentCateChange">

          </el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info">重置</el-button>
        <el-button type="primary" @click="addCategory">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {addCategory, getParentCategoryList} from "@/network/Category";
import {ElMessage} from "element-plus";

export default {
  name: "AddCategoryDialog",
  data() {
    return {
      addCategoryVisible: false,
      addCategoryForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      // optionsCate:[],
      parentCategoryList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name'
      },
      selectedKeys: [],
      addCategoryRules: {
        cat_name: {required: true, message: '请输入分类名称', trigger: 'blur'}
      }
    }
  },
  // created() {
  //   this.getParentCategoryList()
  // },
  watch: {
    addCategoryVisible() {
      if (this.addCategoryVisible)
        this.getParentCategoryList()
    }
  },
  methods: {
    getParentCategoryList() {
      // let parentCategoryList
      // let optionsCate = []
      getParentCategoryList(2).then(res => {
        this.parentCategoryList = res.data
        // parentCategoryList.forEach(item => {
        //   optionsCate.push({'label': item.cat_name})
        //
        // })
        // this.optionsCate = optionsCate
        // console.log(this.optionsCate);
      })
    },
    parentCateChange() {
      // console.log(this.selectedKeys)
      if (this.selectedKeys) {
        this.addCategoryForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // switch (this.selectedKeys.length){
        //   case 1:this.addCategoryForm.cat_level = 1
        //     break
        //   case 2:this.addCategoryForm.cat_level = 2
        // }
        this.addCategoryForm.cat_level = this.selectedKeys.length
        console.log(this.addCategoryForm);
      }
      else {
        this.addCategoryForm.cat_level = 0
        this.addCategoryForm.cat_pid = 0
        console.log(this.addCategoryForm);

      }

    },
    addCategory() {
      addCategory(this.addCategoryForm).then(res => {
        if (res.meta.status !== 201) return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.addCategoryVisible = false
        this.$emit('updateList')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
