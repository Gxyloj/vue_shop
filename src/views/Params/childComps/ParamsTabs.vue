<template>
  <!--      tab页签-->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <el-button type="primary" :disabled="isBtnDisable">添加参数</el-button>
      <DataTable :paramsData="this.manyTableData"></DataTable>
<!--      {{this.onlyTableData}}-->
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
      <el-button type="primary" :disabled="isBtnDisable">添加属性</el-button>
      <DataTable :paramsData="this.onlyTableData"></DataTable>
      <!--      {{this.manyTableData}}-->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {getCategoryAttributes} from "@/network/Category";
import DataTable from "@/views/Params/childComps/DataTable";

export default {
  name: "ParamsTabs",
  components: {DataTable},
  props:{
    selectedKeys:{
      type:Array
    }
  },
  data(){
    return {
      activeName:'many',
      attributesType:'many',
      onlyTableData:[],
      manyTableData:[],


    }
  },
  computed:{
    isBtnDisable(){
      if (this.selectedKeys != null){
        return this.selectedKeys.length !== 3;
      }else return true

    },
    cateID(){
      if (this.selectedKeys.length === 3){
        return this.selectedKeys[3]
      }
      return null
    }
  },
  created() {

  },
  methods:{
    handleClick(){
      this.attributesType = this.activeName
      this.getParamsData()
    },
    getParamsData(){
      if (this.selectedKeys){
        getCategoryAttributes(this.selectedKeys.at(-1),this.attributesType).then(res => {
          // console.log(res);
          if (this.attributesType === 'only'){
            this.onlyTableData = res.data
            console.log(this.onlyTableData);
          }else if(this.attributesType === 'many'){
            this.manyTableData = res.data
            console.log(this.manyTableData);
          }
        })
      }
    }

  },
  watch:{
    selectedKeys(){
      // console.log(this.selectedKeys.at(-1));
      this.getParamsData()

    }
  }
}
</script>

<style scoped>
.el-button{
  margin-bottom: 10px;
}
</style>
