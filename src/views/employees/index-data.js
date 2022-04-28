import { getEmployeeList, delEmployee } from "@/api/employees";
import EmployeeEnum from "@/constant/employees"
import AddEmployee from './components/add-employee.vue'
import { formatDate } from "@/filters";
export default {
  components: { AddEmployee },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0, // 总数
      },
      loading: false, // 显示遮罩层
      showDialog: false,
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    async getEmployeeList() {
      this.loading = true;
      const { total, rows } = await getEmployeeList(this.page);
      this.list = rows;
      this.page.total = total;
      // console.log(this.page, this.list);
      this.loading = false; // 显示遮罩层
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList();
    },
    // 格式化聘用时间
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => {
        return item.id === cellValue
      })
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除该员工吗')
        delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (err) {
        console.log(err);
      }
    },
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data, //具体数据 必填
          filename: '员工资料表', // 文件名 非必填
          // autoWidth: true, // 非必填
          bookType: 'xlsx', // 导出文件类型 非必填
          multiHeader,  // 复杂表头
          merges // 合并表格
        })
      })
    },
    formatJson(headers, rows) {
      // item是一个对象 对象里添加属性
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === "timeOfEntry" || headers[key] === "correctionTime") {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(type => type.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    }
  },

};
