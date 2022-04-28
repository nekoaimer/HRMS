import { addEmployee } from "@/api/employees";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";
import EmployeeEnum from "@/constant/employees";
export default {
  data() {
    return {
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/, // 正常表达式
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
      treeData: [],
      showTree: false,
      loading: false,
      EmployeeEnum,
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async getDepartments() {
      this.loading = true;
      this.showTree = true;
      const { depts } = await getDepartments();
      this.treeData = tranListToTreeData(depts);
      this.loading = false;
      console.log(this.treeData);
    },
    async btnOk() {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this?.$parent?.getEmployeeList()
        this.$emit("update:showDialog", false);
        this.$message.success('添加成功~')
      } catch (err) {
        console.log(err);
      }
    },
    btnCancel() {
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      this.$refs.addEmployee.resetFields()
      this.$emit("update:showDialog", false);
    },
    handleNodeClick({ name }) {
      this.formData.departmentName = name;
      this.showTree = false;
    },
  },
};
