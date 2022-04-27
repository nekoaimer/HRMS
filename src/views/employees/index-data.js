import { getEmployeeList } from "@/api/employees";
import EmployeeEnum from "@/constant/employees"

export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0, // 总数
      },
      loading: false, // 显示遮罩层
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
      console.log(this.page, this.list);
      this.loading = false; // 显示遮罩层
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList();
    },
    // 格式化聘用时间
    formatEmployment(row, column, cellValue, index) {
      console.log(row, column, cellValue, index);
      const obj = EmployeeEnum.hireType.find(item => {
        return item.id === cellValue
      })
      return obj ? obj.value : '未知'
    }
  },

};
