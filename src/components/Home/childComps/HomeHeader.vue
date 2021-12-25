<template>
  <div class="home_header">
    <div>
      <img src="../../../assets/logo.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  methods:{
    logout(){
      this.$emit('logout')
    }
  }
}
</script>

<style lang="less" scoped>
.home_header{
  background-color: #363d40;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
  img{
    width: 50px;
  }
  button{
    margin: 10px;
  }
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
    }
  }
}
</style>
