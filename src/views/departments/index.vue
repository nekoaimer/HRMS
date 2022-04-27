<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <TreeTools
          :treeNode="company"
          @addDepts="addDepts"
          :isRoot="true"
        ></TreeTools>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <TreeTools
            slot-scope="{ data }"
            :treeNode="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          ></TreeTools>
        </el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="treeNode"
      @addDepts="addDepts"
    ></AddDept>
  </div>
</template>

<script>
import indexData from "./index-data";
export default indexData;
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
