<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <!--      顶部提示信息-->
      <el-alert title="添加商品信息" type="info" show-icon center/>
      <!--      步骤条-->
      <el-steps :active="1" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="商品完成"></el-step>
      </el-steps>
      <!--      tab标签页-->
      <el-tabs tab-position="left">
        <el-tab-pane label="基本信息">User</el-tab-pane>
        <el-tab-pane label="商品参数">Config</el-tab-pane>
        <el-tab-pane label="商品属性">Role</el-tab-pane>
        <el-tab-pane label="商品图片">Task</el-tab-pane>
        <el-tab-pane label="商品内容">Task</el-tab-pane>
        <el-tab-pane label="商品完成">Task</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";

export default {
  name: "AddGoods",
  components: {BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '商品管理', '添加商品'],
        path: ['/home']
      }
    }
  }
}
</script>

<style scoped>
.el-alert {
  border-radius: 4px;
  margin-bottom: 20px;
}

.el-steps {
  margin-bottom: 20px;
}

/deep/ .el-step__title {
  font-size: 14px;
}
</style>
