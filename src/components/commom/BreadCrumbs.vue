<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: navTitle.path[index] }" v-for="(item,index) in navTitle.title">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props:{
    navTitle:{
      type:Object
    }
  }
}
</script>

<style scoped>

</style>
