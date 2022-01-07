<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <el-button type="primary" @click="addCategory">添加分类</el-button>
      <CategoryList/>
    </el-card>
    <AddCategoryDialog ref="AddCategoryDialogRef"/>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import CategoryList from "@/views/Category/childComps/CategoryList";
import AddCategoryDialog from "@/views/Category/childComps/AddCategoryDialog";
export default {
  name: "Category",
  components: {AddCategoryDialog, CategoryList, BreadCrumbs},
  data(){
    return {
      navTitle:{
        title:['首页','商品管理','商品分类'],
        path:['/home']
      }
    }
  },
  methods:{
    addCategory(){
      this.$refs.AddCategoryDialogRef.addCategoryVisible = true
    }
  }
}
</script>

<style scoped>

</style>
