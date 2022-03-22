<template>
  <div>
    <el-dialog v-model="previewDialogVisible"
               title="图片预览"
               width="50%">
      <img :src="previewPath" alt="" class="previewImage">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PreviewDialog",
  props:{
    previewPath:{
      type:String
    }
  },
  data(){
    return {
      previewDialogVisible:false
    }
  }
}
</script>

<style scoped>
.previewImage{
  width: 100%;
}

</style>
