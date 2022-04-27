<template>
  <div id="GoodsListTable">
    <el-table border stripe sortable
              :data="goodsList"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="105px"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80px"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="160px"></el-table-column>
      <el-table-column label="操作" width="120px">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editParams(scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"
                     @click="deleteGoods(scope.row.goods_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteGoods} from "@/network/GoodsList";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "GoodsListTable",
  props: {
    goodsList: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    deleteGoods(id) {
      ElMessageBox.confirm(
          '是否确认删除商品',
          '提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }
      ).then(() => {
        deleteGoods(id).then(res => {
          if (res.meta.status !== 200) return
          ElMessage.success(res.meta.msg)
          this.$bus.$emit('updateGoodsListBus')
        })
      }).catch(() => {
        ElMessage({
          type:'info',
          message:'操作取消'
        })
      })

    }
  }

}
</script>

<style scoped>
#GoodsListTable {
  margin-bottom: 15px;
}
</style>
