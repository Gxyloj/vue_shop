<template>
  <div>
    <el-menu background-color="#313743"
             text-color="#fff"
             active-text-color="#399eff"
             :unique-opened="true"
             :collapse="isCollapse"
             :collapse-transition="false"
             :router="true" :default-active="activePath">
      <!--      一级菜单-->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template #title>
          <i :class="iconObj[item.id]"/>
          <span>{{item.authName}}</span>
        </template>
        <!--        二级菜单-->
        <el-menu-item :index="'/' + subItem.path"
                      v-for="subItem in item.children"
                      :key="subItem.id" @click="saveNavState('/' + subItem.path)">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>{{subItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HomeSide",
  props:{
    menuList:{
      type:Array
    },
    isCollapse:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      iconObj:{
        '125':'iconfont icon-yonghu',
        '103':'iconfont icon-quanxianguanli',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-dingdan',
        '145':'iconfont icon-iconfontpaixingbang',
      },
      activePath:''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .iconfont,
  .el-icon{
    margin-right: 5px;
  }
  .el-menu{
    border-right: none;
  }
</style>
