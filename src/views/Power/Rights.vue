<template>
  <div>
    <BreadCrumbs :navTitle="navTitle"/>
    <el-card>
      <RightsList :rightsList="rightsList"/>
    </el-card>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/commom/BreadCrumbs";
import {getRightsList} from "@/network/Power";
import {ElMessage} from "element-plus";
import RightsList from "@/views/Power/childComps/RightsList";
export default {
  name: "Rights",
  components: {RightsList, BreadCrumbs},
  data(){
    return {
      navTitle:{
        title:['首页','权限管理','权限列表'],
        path:['/home']
      },
      rightsList:[]
    }
  },
  created() {
    this.getRightsList()
  },
  methods:{
    getRightsList(){
      getRightsList().then(res => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
        ElMessage.success(res.meta.msg)
        this.rightsList = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
