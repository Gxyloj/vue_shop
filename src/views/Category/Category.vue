<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <el-button type="primary">添加分类</el-button>
      <CategoryList/>
    </el-card>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import CategoryList from "@/views/Category/childComps/CategoryList";
export default {
  name: "Category",
  components: {CategoryList, BreadCrumbs},
  data(){
    return {
      navTitle:{
        title:['首页','商品管理','商品分类'],
        path:['/home']
      }
    }
  }
}
</script>

<style scoped>

</style>
