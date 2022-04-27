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

      <el-form :model="goodsInfoForm" :rules="goodsInfoFormRules" label-position="top">
        <el-tabs tab-position="left" :before-leave="beforeLeave">
          <el-tab-pane label="基本信息">
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
              <el-form-item label="商品分类">
                <el-cascader :options="cateList"
                             clearable
                             :props="cascaderProps"
                             v-model="selectedKeys"
                             @change="selectedChange">

                </el-cascader>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item v-for="item in manyData"
                          :label="item.attr_name"
                          :key="item.attr_id">
              <!--              复选框组-->
              <!--              vals是实际绑定的数据-->
              <!--              valsCopy是有哪些是要显示的-->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox v-for="(cb,i) in item.attr_valsCopy"
                             :label="cb"
                             border/>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item v-for="item in onlyData"
                          :label="item.attr_name"
                          :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">Task</el-tab-pane>
          <el-tab-pane label="商品内容">Task</el-tab-pane>
          <el-tab-pane label="商品完成">Task</el-tab-pane>
        </el-tabs>
      </el-form>

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
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import {checkNotZero} from "@/common/utlis";


export default {
  name: "AddGoods",
  components: {PreviewDialog, BreadCrumbs, Vue3Tinymce},
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
        pics: [],
      },
      goodsInfoFormRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        goods_price: [
          {required: true, message: '请设置商品价格', trigger: 'blur'},
          {validator: checkNotZero, trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '请设置商品重量', trigger: 'blur'},
          {validator: checkNotZero, trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '请设置商品数量', trigger: 'blur'},
          {validator: checkNotZero, trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'}
        ]


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
      manyData: [],
      //图片上传组件的headers对象
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      setting: {
        height: 500,
        menubar: false,
        toolbar:
            'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
        plugins: 'codesample link image table lists fullscreen',
        toolbar_mode: 'sliding',
        nonbreaking_force_tab: true,
        link_title: false,
        default_link_target: '_blank',
        content_style: 'body{font-size: 16px}',
        // 自定义 图片上传模式
        // custom_images_upload: true,
        // images_upload_url: 'your_upload_api_url...',
        // custom_images_upload_callback: res => res.url,
        // custom_images_upload_param: { id: 'xxxx01', age: 18 },
        // 以中文简体为例
        language: 'zh_CN',
        language_url:
            'https://unpkg.com/@jsdawn/vue3-tinymce@1.1.6/dist/tinymce/langs/zh_CN.js'
      },
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
          if (this.selectedKeys) {
            getCategoryAttributes(this.selectedKeys.at(-1), 'many').then(res => {
              // console.log(res);
              res.data.forEach(item => {
                item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
                item.attr_valsCopy = item.attr_vals
                this.manyData = res.data
                // console.log(this.manyData);
              })
            })
          }
          break;
        case '2':
          if (this.selectedKeys) {
            getCategoryAttributes(this.selectedKeys.at(-1), 'only').then(res => {
              console.log(res)
              this.onlyData = res.data
            })
          }
      }
    },
    selectedChange() {
      if (this.selectedKeys) {
        if (this.selectedKeys.length !== 3) {
          this.selectedKeys = []
        }
      }
      if (this.selectedKeys) {
        this.goodsInfoForm.goods_cat = this.selectedKeys.join(',')
      } else {
        this.goodsInfoForm.goods_cat = null
      }
    },
    addGoods() {
      // console.log(this.goodsInfoForm);

      addGoods(this.goodsInfoForm).then(res => {
        if (res.meta.status === 201) {
          ElMessage.success(res.meta.msg)
          this.$router.push('/goods')
        } else {
          ElMessage.error(res.meta.msg)
        }
      })
    },
    //图片预览
    handlePreview(file) {
      console.log(file);
      this.previewPath = 'http://gxyloj.eicp.net:8094/' + file.response.data.tmp_path
      this.$refs.PreviewDialogRef.previewDialogVisible = true
    },
    //图片remove
    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      const i = this.goodsInfoForm.pics.findIndex(x => x.pic === filePath)
      this.goodsInfoForm.pics.splice(i, 1)
      console.log(this.goodsInfoForm);
    },
    //图片成功上传
    handleSuccess(response) {
      const picInfo = {pic: response.data.tmp_path}
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
