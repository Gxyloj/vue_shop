<template>
  <div>
    <el-table :data="rightsList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level=== '0' " effect="dark">一级</el-tag>
          <el-tag v-if="scope.row.level=== '1' " effect="dark" type="success">二级</el-tag>
          <el-tag v-if="scope.row.level=== '2' " effect="dark" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "RightsList",
  props: {
    rightsList: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
