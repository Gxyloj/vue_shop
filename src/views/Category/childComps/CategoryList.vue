<template>
  <div>
    <el-table  border stripe
               :data="cateList"
               row-key="cat_id" >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="" label="是否有效"></el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template v-slot="scope">
          <el-tag v-if="scope.row.cat_level === 0 ">一级</el-tag>
          <el-tag v-if="scope.row.cat_level === 1 " type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level === 2 " type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getCategoryList} from "@/network/Category";

export default {
  name: "CategoryList",
  data() {
    return {
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      getCategoryList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return
        this.cateList = res.data
        console.log(this.cateList);
      })
    },
    indexMethod(index){
      return index * 2
    }
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 15px;
}
</style>
