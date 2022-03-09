<template>
  <!--      tab页签-->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <el-button type="primary" :disabled="isBtnDisable" @click="addParams('动态参数','many')">添加参数</el-button>
      <DataTable :paramsData="this.manyTableData" @updateParamsList="updateParamsList"></DataTable>
<!--      {{this.onlyTableData}}-->
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
      <el-button type="primary" :disabled="isBtnDisable" @click="addParams('静态属性','only')">添加属性</el-button>
      <DataTable :paramsData="this.onlyTableData" @updateParamsList="updateParamsList"></DataTable>
      <!--      {{this.manyTableData}}-->
    </el-tab-pane>
  </el-tabs>
  <AddParams ref="AddParamsRef" @updateParamsList="updateParamsList"></AddParams>
</template>

<script>
import {getCategoryAttributes} from "@/network/Category";
import DataTable from "@/views/Params/childComps/DataTable";
import AddParams from "@/views/Params/childComps/AddParamsDialog";

export default {
  name: "ParamsTabs",
  components: {AddParams, DataTable},
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
    this.$bus.$on("updateParamsListBus",this.updateParamsList)
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
          // if (this.attributesType === 'only'){
          //   // console.log(res.data);
          //   res.data.forEach(item => {
          //     item.attr_vals  = item.attr_vals ? item.attr_vals.split(',') : []
          //
          //   })
          //   this.onlyTableData = res.data
          //   console.log(this.onlyTableData);
          // }else if(this.attributesType === 'many'){
          //   // console.log(res.data);
          //   res.data.forEach(item => {
          //     item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
          //   })
          //   this.manyTableData = res.data
          //   // console.log(this.manyTableData);
          // }
          // console.log(res.data);
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
            item.inputVisible = false
            item.inputValue = ''
            this.attributesType === 'only' ? this.onlyTableData = res.data : this.manyTableData = res.data
          })
        })
      }
    },
    addParams(title,sel){
      //添加数据弹出框
      this.$refs.AddParamsRef.addParamsVisible = true
      this.$refs.AddParamsRef.addParamsDialogTitle = title
      //添加数据表单的父级分类ID和添加的类别
      // console.log(this.selectedKeys.at(-1));
      // console.log(sel);
      this.$refs.AddParamsRef.addParamsForm.cat_id = this.selectedKeys.at(-1)
      this.$refs.AddParamsRef.addParamsForm.attr_sel = sel

    },
    updateParamsList(){
      this.getParamsData()
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
