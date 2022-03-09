<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>

<style>
/*隐藏级联选择器前的点*/
.el-cascader-panel .el-radio{
  z-index: 10;
  width: 99%;
  height: 99%;
  position: absolute;
  top: 10px;
  right: -12px;
}
.el-cascader-panel .el-radio__input{
  visibility: hidden;
}
.el-cascader-panel .el-cascader-node__postfix{
  top: 10px;
}
/**/
</style>
