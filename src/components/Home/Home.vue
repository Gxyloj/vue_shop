<template>
  <div>
    <el-container class="home_container">
<!--      头部-->
      <el-header>
        <home-header @logout="logout"></home-header>
      </el-header>
      <el-container>
<!--        侧边栏-->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle_button" @click="toggleCollapse">
            |||
          </div>
          <home-side :menuList="menuList" :isCollapse="isCollapse"></home-side>
        </el-aside>
<!--        右侧-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {getMenus} from "@/network/getMenus";
import HomeHeader from "@/components/Home/childComps/HomeHeader";
import HomeSide from "@/components/Home/childComps/HomeSide";

export default {
  name: "Home",
  components: {HomeSide, HomeHeader},
  data(){
    return{
      menuList:[],
      isCollapse:false
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      ElMessage.success('退出成功')
      this.$router.push('/login')
    },
    getMenus(){
      getMenus().then(res => {
        // console.log(res);
        if (res.meta.status !== 200) return ElMessage.error('获取失败')
        this.menuList = res.data
        console.log(this.menuList);
      })
    },
    // 折叠菜单
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenus()
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
  background-color: #313743;
}

.el-main {
  background-color: #e9edf0;
}

.toggle_button{
  background-color: #313743;
  color: #fff;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
