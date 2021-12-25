<template>
  <div>
    <el-menu background-color="#313743"
             text-color="#fff">
      <!--      一级菜单-->
      <el-submenu index="1">
        <template #title>
          <i class="iconfont icon-yonghu"/>
          <span>用户管理</span>
        </template>
        <!--        二级菜单-->
        <el-menu-item index="1-1">
          <template #title>
            <i class="iconfont icon-yonghu"/>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="iconfont icon-quanxianguanli"/>
          <span>权限管理</span>
        </template>
      </el-submenu>
      <el-submenu index="3">
        <template #title>
          <i class="iconfont icon-shangpin"/>
          <span>商品管理</span>
        </template>
      </el-submenu>
      <el-submenu index="4">
        <template #title>
          <i class="iconfont icon-dingdan"/>
          <span>订单管理</span>
        </template>
      </el-submenu>
      <el-submenu index="5">
        <template #title>
          <i class="iconfont icon-iconfontpaixingbang"/>
          <span>数据统计</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HomeSide"
}
</script>

<style scoped>

</style>
