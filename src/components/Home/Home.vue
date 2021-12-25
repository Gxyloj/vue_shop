<template>
  <div>
    <el-container class="home_container">
<!--      头部-->
      <el-header>
        <home-header @logout="logout"></home-header>
      </el-header>
      <el-container>
<!--        侧边栏-->
        <el-aside width="200px">
          <home-side></home-side>
        </el-aside>
<!--        右侧-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import HomeHeader from "@/components/Home/childComps/HomeHeader";
import HomeSide from "@/components/Home/childComps/HomeSide";

export default {
  name: "Home",
  components: {HomeSide, HomeHeader},
  methods:{
    logout(){
      window.sessionStorage.clear()
      ElMessage.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container{
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #363d40;
}

.el-aside {
  background-color: #363d40;
}

.el-main {
  background-color: #e9edf0;
}
</style>
