<template>
  <el-dialog :visible="showDialog" :title="showTitle" @close="btnCancel">
    <el-form
      ref="deptForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="1-50个字符"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          type="textarea"
          :rows="4"
          resize="none"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button @click="btnCancel" size="small">取消 </el-button>
        <el-button @click="btnOk" size="small" type="promary">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import addDeptData from "./add-dept-data";
export default addDeptData;
</script>

<style></style>
