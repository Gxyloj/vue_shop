<template xmlns="">
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <!--      顶部提示信息-->
      <el-alert title="添加商品信息" type="info" show-icon center/>


      <!--      步骤条-->
      <el-steps :active="activeStep" align-center>
        <!--                <el-step title="基本信息"></el-step>
                        <el-step title="商品参数"></el-step>
                        <el-step title="商品属性"></el-step>
                        <el-step title="商品图片"></el-step>
                        <el-step title="商品内容"></el-step>
                        <el-step title="商品完成"></el-step>-->
        <el-step v-for="item in tabsValues" :title="item.title"></el-step>
      </el-steps>


      <!--      tab标签页-->
      <el-tabs tab-position="left" :before-leave="beforeLeave">
        <!--                <el-tab-pane label="基本信息" :name="tabsValues.title[1]">
                          User
                          <el-button @click="a"></el-button>
                        </el-tab-pane>
                        <el-tab-pane label="商品参数" :name="tabsValues.title[2]">
                          Config
                          <el-button @click="a"></el-button>
                        </el-tab-pane>
                        <el-tab-pane label="商品属性" :name="tabsValues.title[3]">
                          Role
                          <el-button @click="a"></el-button>
                        </el-tab-pane>
                        <el-tab-pane label="商品图片" :name="tabsValues.title[4]">
                          Task
                          <el-button @click="a"></el-button>
                        </el-tab-pane>
                        <el-tab-pane label="商品内容" :name="tabsValues.title[5]">
                          Task
                          <el-button @click="a"></el-button>
                        </el-tab-pane>
                        <el-tab-pane label="商品完成" :name="tabsValues.title[6]">
                          Task
                          <el-button @click="a"></el-button>
                        </el-tab-pane>-->
        <el-tab-pane v-for="(item,index) in tabsValues"
                     :label="item.title"
        >
          <!--          基本信息-->
          <div v-if="index === 0">
            <el-form :model="goodsInfoForm">
              <div style="width: 50%">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="goodsInfoForm.goods_name" type="textarea" :row="3"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input-number v-model="goodsInfoForm.goods_price"></el-input-number>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input-number v-model="goodsInfoForm.goods_weight"></el-input-number>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input-number v-model="goodsInfoForm.goods_number"></el-input-number>
                </el-form-item>
                <el-form-item>
                  <el-cascader :options="cateList"
                               clearable
                               :props="cascaderProps"
                               v-model="selectedKeys"
                               @change="selectedChange">

                  </el-cascader>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div v-if="index === 1">
            <div v-for="cbGroup in manyData">
              <p>{{ cbGroup.attr_name }}</p>
              <!--              cbGroup.attr_valsCopy为实际选中的选项-->
              <el-checkbox-group v-model="cbGroup.attr_valsCopy">
                <el-checkbox v-for="cbName in cbGroup.attr_vals"
                             :label="cbName" border/>
              </el-checkbox-group>
            </div>
          </div>
          <!--          商品属性-->
          <div v-if="index === 2">
            <!--            {{ onlyData }}-->
            <el-form :model="onlyData" label-position="top">
              <el-form-item v-for="item in onlyData" :label="item.attr_name">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!--          商品图片-->
          <div v-if="index === 3">
            <el-upload
                action="http://gxyloj.eicp.net:8094/api/private/v1/upload"
                :headers="headersObj"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                list-type="picture"
            >
              <el-button type="primary">点击上传图片</el-button>
              <!--              <template #tip>
                              <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                              </div>
                            </template>-->
            </el-upload>
          </div>
          <div v-if="index === 5">
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  <PreviewDialog ref="PreviewDialogRef" :previewPath="previewPath"/>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import {getCategoryAttributes, getParentCategoryList} from "@/network/Category";
import {ElMessage} from "element-plus";
import {addGoods} from "@/network/GoodsList";
import PreviewDialog from "@/views/GoodsList/ChildComps/PreviewDialog";

export default {
  name: "AddGoods",
  components: {PreviewDialog, BreadCrumbs},
  data() {
    return {
      navTitle: {
        title: ['首页', '商品管理', '添加商品'],
        path: ['/home']
      },
      //步骤条进度
      activeStep: 1,
      //tab页面数据
      tabsValues: [
        {
          index: 0,
          title: '基本信息'
        },
        {
          index: 1,
          title: '商品参数'
        },
        {
          index: 2,
          title: '商品属性',
          disabled: true
        },
        {
          index: 3,
          title: '商品图片'
        },
        {
          index: 4,
          title: '商品内容'
        },
        {
          index: 5,
          title: '商品完成'
        },
      ],
      OK: true,
      goodsInfoForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics:[],
      },
      cateList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name'
      },
      selectedKeys: [],
      onlyData: [],
      onlyDataCopy: [],
      manyData: [],
      //图片上传组件的headers对象
      headersObj:{
        Authorization:window.sessionStorage.getItem('token')
      },
      previewPath:''
    }
  },
  created() {
    getParentCategoryList(3).then(res => {
      if (res.meta.status !== 200) return
      this.cateList = res.data
    })
  },
  methods: {
    beforeLeave(activeName, oldActiveName) {
      this.activeStep = Number(activeName) + 1
      // console.log('点击的' + activeName);
      // console.log('之前的' + oldActiveName);
      if (!this.goodsInfoForm.goods_cat) {
        ElMessage.error('请先选择商品分类')
        this.activeStep = oldActiveName + 1
        return false
      }
      switch (activeName) {
        case '1':
          getCategoryAttributes(this.selectedKeys.at(-1), 'many').then(res => {
            // console.log(res);
            res.data.forEach(item => {
              item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
              item.attr_valsCopy = item.attr_vals
              this.manyData = res.data
              // console.log(this.manyData);
            })
          })
          break;
        case '2':
          getCategoryAttributes(this.selectedKeys.at(-1), 'only').then(res => {
            this.onlyData = res.data

          })
      }
    },
    selectedChange() {
      this.goodsInfoForm.goods_cat = this.selectedKeys.join(',')
      if (this.selectedKeys) {
        if (this.selectedKeys.length !== 3) {
          this.selectedKeys = []
        }
      }
    },
    addGoods() {
      console.log(this.goodsInfoForm);

      // addGoods(this.goodsInfoForm).then(res => {
      //   console.log(res);
      // })
    },
    //图片预览
    handlePreview(file){
      console.log(file);
      this.previewPath = 'http://gxyloj.eicp.net:8094/' + file.response.data.tmp_path
      this.$refs.PreviewDialogRef.previewDialogVisible = true
    },
    //图片remove
    handleRemove(file){
      const filePath = file.response.data.tmp_path
      const i = this.goodsInfoForm.pics.findIndex(x => x.pic === filePath)
      this.goodsInfoForm.pics.splice(i,1)
      console.log(this.goodsInfoForm);
    },
    //图片成功上传
    handleSuccess(response){
      const picInfo = {pic:response.data.tmp_path}
      this.goodsInfoForm.pics.push(picInfo)

    },

  }
}
</script>

<style scoped>
.el-alert {
  border-radius: 4px;
  margin-bottom: 20px;
}

.el-steps {
  margin-bottom: 20px;
}

/deep/ .el-step__title {
  font-size: 14px;
}

/deep/ .is-process {
  color: var(--el-text-color-placeholder);
  border-color: var(--el-text-color-placeholder);
  font-weight: normal;
}

/deep/ .el-cascader {
  width: 50%;
}

.el-checkbox {
  margin: 0 10px 5px;
}

.el-form-item__label {
  text-align: left;
  float: none;
  word-break: break-word;
}
</style>
