import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from "@/api/setting";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      formData: {

      },
      showDialog: false, // 控制弹出显示
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{
          required: true,
          message: '角色名不能为空',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除改角色吗') // 点击确定后才会进行下面操作
        await deleteRole(id) // 调用删除接口
        this.getRoleList(); // 重新加载
        this.$message.success('删除角色成功')
      } catch (err) {
        console.log(err);
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id) // 回写数据
      this.showDialog = true // 显示弹窗
    },
    async btnOk() {
      try {
        // 校验通过才执行下面逻辑
        await this.$refs.roleForm.validate()
        // 有id即是编辑 否则是新增
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false // 关闭弹窗时会触发el-dialog的close事件
      } catch (err) {
        // this.$error(err);
        console.log(err);
      }
    },
    changePage(newPage) {
      console.log(newPage);
      this.page.page = newPage;
      this.getRoleList();
    },
    btnCancel() {
      // console.log('btnCancel');
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },

  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
  computed: {
    ...mapGetters(['companyId'])
  }
};
