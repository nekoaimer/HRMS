<template>
  <el-dialog :visible="showDialog" @close="btnCancel">
    <el-form
      ref="addEmployee"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 60%"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 60%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 60%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 60%"
          placeholder="请选择聘用形式"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 60%"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          @focus="getDepartments"
          v-model="formData.departmentName"
          style="width: 60%"
          placeholder="请输入部门"
        ></el-input>
        <el-tree
          v-loading="loading"
          :data="treeData"
          :props="{ label: 'name' }"
          @node-click="handleNodeClick"
          v-if="showTree"
        ></el-tree>
      </el-form-item>
      <el-form-item
        label="转正时间"
        prop="correctionTime"
        placeholder="请选择转正时间"
      >
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 60%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!--  -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="btnCancel" size="small">取消</el-button>
          <el-button @click="btnOk" size="small" type="primary">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import addEmployeeData from "./add-employee-data";
export default addEmployeeData;
</script>
