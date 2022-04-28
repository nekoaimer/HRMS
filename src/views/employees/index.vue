<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧显示总记录数 -->
        <template v-slot:before>
          <span slot="before"> 共16条记录 </span>
        </template>
        <template v-slot:after>
          <el-button
            @click="$router.push('/import')"
            size="small"
            type="success"
          >
            execl导入
          </el-button>
          <el-button @click="exportData" size="small" type="danger">
            execl导出
          </el-button>
          <el-button @click="showDialog = true" size="small" type="primary">
            新增员工
          </el-button>
        </template>
      </page-tools>
      <!-- 表格组件 -->
      <el-table :data="list" v-loading="loading">
        <el-table-column type="index" align="middle" label="序号" sortable="" />
        <el-table-column prop="username" label="姓名" sortable="" />
        <el-table-column prop="workNumber" label="工号" sortable="" />
        <el-table-column
          prop="formOfEmployment"
          :formatter="formatEmployment"
          label="聘用形式"
          sortable=""
        />
        <el-table-column prop="departmentName" label="部门" sortable="" />

        <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <template v-slot="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>

        <el-table-column prop="enableState" label="账户状态" sortable="">
          <template v-slot="{ row }">
            <el-switch :value="row.enableState === 1"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="操作"
          sortable=""
          fixed="right"
          width="280"
        >
          <template v-slot="{ row }">
            <el-button
              @click="$router.push(`/employees/detail/${row.id}`)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button @click="delEmployee(row.id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.page"
          :page-size="page.size"
          :total="page.total"
          layout="prev, pager, next"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </div>
    <addEmployee :showDialog.sync="showDialog"></addEmployee>
  </div>
</template>

<script>
import indexData from "./index-data";
export default indexData;
</script>
