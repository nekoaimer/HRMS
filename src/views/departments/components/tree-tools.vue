<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }} </span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span
              >操作
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add"> 添加子部门 </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">
                编辑部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">
                删除部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
export default {
  props: {
    treeNode: {
      type: Object,
      require: true,
      default: {},
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    operateDepts(type) {
      const types = {
        add: () => {
          this.$emit("addDepts", this.treeNode); // 触发自定义事件 告诉父组件 显示弹层
        },
        edit: () => {},
        del: () => {
          this.$confirm("你确定要删除该组织部门吗")
            .then(() => {
              return delDepartments(this.treeNode?.id);
            })
            .then(() => {
              this.$emit("delDepts");
              this.$message.success("删除部门成功");
            });
        },
      };
      return types[type]();
    },
  },
};
</script>

<style>
</style>
