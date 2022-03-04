<template>
  <div>
    <BreadCrumbs :nav-title="navTitle"/>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"/>
      <!--      选择商品分类-->
      <el-row class="cat_opt">
        <el-col :span="2">
          <span>选择商品分类：</span>
        </el-col>
        <el-col :span="4">
          <!--        级联选择框-->
          <el-cascader :options="cateList"
                       clearable
                       :props="cascaderProps"
                       v-model="selectedKeys"
                       @change="handleChange">

          </el-cascader>
        </el-col>
      </el-row>
      <ParamsTabs :selectedKeys="selectedKeys"/>

    </el-card>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import {getParentCategoryList} from "@/network/Category";
import {ElMessage} from "element-plus";
import ParamsTabs from "@/views/Params/childComps/ParamsTabs";

export default {
  name: "Params",
  components: {ParamsTabs, BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '商品管理', '分类参数'],
        path: ['/home']
      },
      cateList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name'
      },
      selectedKeys: [],
    }
  },
  created() {
    getParentCategoryList(3).then(res => {
      if (res.meta.status !== 200) {
        return ElMessage.error(res.meta.msg)
      }
      this.cateList = res.data
    })
  },
  methods: {
    handleChange() {
      // console.log(this.selectedKeys);
      if (this.selectedKeys){
        if (this.selectedKeys.length !== 3) {
          this.selectedKeys = []
          ElMessage.info('只允许为第三级分类设置相关参数！')
        }
      }

    },
  }
}
</script>

<style scoped lang="less">
.cat_opt {
  margin: 15px 0;

  span {
    line-height: 35px;
  }

}
</style>
