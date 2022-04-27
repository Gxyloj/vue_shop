<template>
        tab标签页
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
            <div v-if="index === 4">
              <Vue3Tinymce :setting="setting"/>
            </div>
            <div v-if="index === 5">
              <el-button type="primary" @click="addGoods">添加商品</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
</template>

<script>
export default {
  name: "addg"
}
</script>

<style scoped>

</style>
