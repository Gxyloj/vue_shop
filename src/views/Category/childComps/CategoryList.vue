<template>
  <div>
    <el-table  border
               :data="tableData"
               row-key="cat_id"
               lazy
               :load="load"
               ref="table"
               >
<!--      DONE:展开列表极卡 会渲染出大量不显示的二三级菜单-->
<!--      TODO:理解load-->
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
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCategory(scope.row.cat_id)">删除</el-button>
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
                      @updateList="updateList"/>
</template>

<script>
import {deleteCategory, getCategoryList} from "@/network/Category";
import EditCategoryDialog from "@/views/Category/childComps/EditCategoryDialog";
import {ElMessage} from "element-plus";

export default {
  name: "CategoryList",
  components: {EditCategoryDialog},
  data() {
    return {
      tableData: [],
      tableDataCopy:[],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total:0,
      editCategoryForm:{},
      showTable:''
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      getCategoryList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return
        // console.log(res);
        // this.cateList = res.data.result
        this.tableDataCopy = res.data.result || [] // 备份的全量数据
        this.tableData = JSON.parse(JSON.stringify(res.data.result)).map(item => { // 展示数据
          // hasChildren 表示需要展示一个箭头图标
          item.hasChildren = item.children && item.children.length > 0
          // 只展示一层
          // 如果有children数据，会自动加载，就不是懒加载了，也可以配置tree-props里面的children为其他字段
          item.children = null
          // 记住层级关系
          item.idList = [item.cat_id]
          return item
        })
        this.total = res.data.total
        // console.log(this.cateList);
      })
    },
    editCategory(cateInfo){
      this.$refs.EditCategoryDialogRef.EditCategoryVisible = true
      // console.log(cateInfo);
      this.editCategoryForm = cateInfo
    },
    deleteCategory(cateID){
      deleteCategory(cateID).then(res =>{
        if (res.meta.status !== 200 ) return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.getCategoryList()
      })
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
    load (tree, treeNode, resolve) {
      // 层级关系备份
      const idCopy = JSON.parse(JSON.stringify(tree.idList))
      // // 查找下一层数据
      let resolveArr = this.tableDataCopy

      let id
      // eslint-disable-next-line
      while (id = tree.idList.shift()) {
        const tarItem = resolveArr.find(item => item.cat_id === id)
        tarItem.loadedChildren = true
        resolveArr = tarItem.children
      }

      // 处理下一层数据的属性
      resolveArr = JSON.parse(JSON.stringify(resolveArr))
      resolveArr.forEach(item => {
        item.hasChildren = item.children && item.children.length > 0
        item.children = null
        // 此处需要深拷贝，以防各个item的idList混乱
        item.idList = JSON.parse(JSON.stringify(idCopy))
        item.idList.push(item.cat_id)
      })

      // 标识已经加载子节点
      tree.loadedChildren = true

      // 渲染子节点
      resolve(resolveArr)
    },
    unload () {
      this.showTable = false
      // eslint-disable-next-line
      this.$nextTick(() => this.showTable = true)
      this.tableData = JSON.parse(JSON.stringify(this.tableDataCopy)).map(item => {
        // hasChildren 表示需要展示一个箭头图标
        item.hasChildren = item.children && item.children.length > 0
        // 只展示一层
        item.children = null
        // 记住层级关系
        item.idList = [item.id]
        return item
      })
    },
    updateList(){
      this.getCategoryList()
      this.load()
    }
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
