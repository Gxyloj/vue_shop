<template>
  <div>
    <BreadCrumbs :nav-title="navTitle"/>
    <el-card>
      <div class="head">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
                placeholder="请输入内容"
                v-model="queryInfo.query"
                clearable
                @clear="getGoodsList"
            >
              <template #append>
                <el-button @click="getGoodsList">
                  <el-icon>
                    <search/>
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="this.$router.push('/goods/add')">
              添加商品
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!--      表格-->
      <GoodsListTable :goodsList="goodsList"/>
      <el-pagination
          :currentPage="queryInfo.pagenum"
          :page-size="queryInfo.pagesize"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import GoodsListTable from "@/views/GoodsList/ChildComps/GoodsListTable";
import {getGoodsList} from "@/network/GoodsList";
import {ElMessage} from "element-plus";
import moment from "moment";

export default {
  name: "GoodsList",
  components: {GoodsListTable, BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '商品管理', '商品列表'],
        path: ['/home']
      },
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 20
      },
      goodsList: [],
      total: null,
    }
  },
  created() {
    this.getGoodsList()
    this.$bus.$on('updateGoodsListBus',this.getGoodsList)
  },
  methods: {
    getGoodsList(msg) {
      getGoodsList(this.queryInfo).then(res => {
        // console.log(this.queryInfo)
        // console.log(res);
        if (res.meta.status !== 200) {
          return ElMessage.error(res.meta.msg)
        }
        ElMessage.success(res.meta.msg)
        this.total = res.data.total
        // this.goodsList = res.data.goods
        // console.log(this.goodsList);
        // console.log(moment(1514345477).format('YYYY-MM-DD HH:mm:ss'));
        if (res.data.goods.length === 0) this.goodsList = []
        res.data.goods.forEach(item => {
          item.add_time = moment(item.upd_time).format('YYYY-MM-DD HH:mm:ss')
          this.goodsList = res.data.goods
        })
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    handleCurrentChange(newPage) {
      let msg = `跳转到第${newPage}页`
      this.queryInfo.pagenum = newPage
      this.getGoodsList(msg)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 20px;
}
</style>
