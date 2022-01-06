<template>
  <div>
    <el-table  border
               :data="cateList"
               row-key=""
               >
<!--      TODO:展开列表极卡 会渲染出大量不显示的二三级菜单-->
<!--      <el-table-column type="index" label="#"></el-table-column>-->
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="" label="是否有效" width="80px">
        <template v-slot="scope">
          <el-result v-if="scope.row.cat_deleted === false" icon="success"/>
          <el-result v-if="scope.row.cat_deleted === true" icon="error"/>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template v-slot="scope">
          <el-tag v-if="scope.row.cat_level === 0 ">一级</el-tag>
          <el-tag v-if="scope.row.cat_level === 1 " type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level === 2 " type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editCategory(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :currentPage="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>

  <EditCategoryDialog ref="EditCategoryDialogRef"
                      :editCategoryForm1="editCategoryForm"
                      @updateList="getCategoryList"/>
</template>

<script>
import {getCategoryList} from "@/network/Category";
import EditCategoryDialog from "@/views/Category/childComps/EditCategoryDialog";

export default {
  name: "CategoryList",
  components: {EditCategoryDialog},
  data() {
    return {
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total:0,
      editCategoryForm:{}
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      getCategoryList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return
        console.log(res);
        this.cateList = res.data.result
        this.total = res.data.total
        // console.log(this.cateList);
      })
    },
    editCategory(cateInfo){
      this.$refs.EditCategoryDialogRef.EditCategoryVisible = true
      // console.log(cateInfo);
      this.editCategoryForm = cateInfo
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // this.$emit('handleSizeChange', this.queryInfo)
      this.getCategoryList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage
      // this.$emit('handleCurrentChange', this.queryInfo)
      this.getCategoryList()

    },
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 15px;
}

.el-result{
  padding: 0;
  display: inline-block;
  --el-result-icon-font-size: 28px;
  margin-left:50%;
  transform: translate(-50%);
}

</style>
