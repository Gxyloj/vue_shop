<template>
  <div>
    <el-container>
<!--      头部-->
      <el-header>Header</el-header>
      <el-container>
<!--        侧边栏-->
        <el-aside width="200px">Aside</el-aside>
<!--        右侧-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Home",
  methods:{
    logout(){
      window.sessionStorage.clear()
      ElMessage.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>
