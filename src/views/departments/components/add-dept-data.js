import { getDepartments, addDepartments } from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";
export default {
  data() {
    // 检测部门名称是否重复
    const checkNameRepeat = async (rule, value, callback) => {
      // value 是部门名称 要去和同级部门下的部门比较
      const { depts } = await getDepartments();

      const isRepeat = depts
        .filter((item) => item.pid === this.treeNode?.id)
        .some((item) => item.name === value);
      console.log(isRepeat, 123);
      isRepeat
        ? callback(new Error(`同级部门下已经存在${value}部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();

      const isRepeat = depts.some((item) => item.code === value && value);
      isRepeat
        ? callback(new Error(`组织架构下已经存在${value}编码了`))
        : callback();
    };
    return {
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "部门名称长度为1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkNameRepeat,
          },
        ],
        code: [
          {
            required: true,
            message: "部门编码不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "部门编码长度为1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkCodeRepeat,
          },
        ],
        manager: [
          {
            required: true,
            message: "部门负责人不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "部门负责人长度为1-50个字符",
            trigger: "blur",
          },
        ],
        introduce: [
          {
            required: true,
            message: "部门介绍不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "部门介绍长度为1-50个字符",
            trigger: "blur",
          },
        ],
      }, // 校验规则
      peoples: [],
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    btnOk() {
      this.$refs.deptForm.validate(async (isOk) => {
        if (isOk) {
          await addDepartments({ ...this.formData, pid: this.treeNode?.id });
          // update:xxx
          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
        }
      });
    },

    btnCancel() {
      this.$emit("update:showDialog", false);
      this.$refs.deptForm.resetFields()
      console.log(this.showDialog);
    },
  },
};
