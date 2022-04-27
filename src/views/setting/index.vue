<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <el-table border="" :data="list">
              <el-table-column
                align="center"
                type="index"
                prop="id"
                label="序号"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="240"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="描述"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    @click.native="editRole(row.id)"
                    size="small"
                    type="primary"
                  >
                    编辑</el-button
                  >
                  <el-button
                    size="small"
                    @click="deleteRole(row.id)"
                    type="danger"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :page-size="page.pagesize"
                :total="page.total"
                :current-page="page.page"
                layout="prev, pager, next"
                @current-change="changePage"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form
              ref="roleForm"
              label-width="120px"
              style="margin-top: 50px"
            >
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width: 400px">
                </el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="formData.companyPhone"
                  disabled
                  style="width: 400px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  disabled
                  style="width: 400px"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层组件 -->
    <el-dialog :visible="showDialog" title="编辑部门" @close="btnCancel">
      <el-form :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            @keyup.native="btnOk"
            v-model="roleForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-button size="small" @click="btnCancel">取 消</el-button>
          <el-button size="small" @click="btnOk" type="primary"
            >确 定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import indexData from "./index-data";
export default indexData;
</script>

<style></style>
