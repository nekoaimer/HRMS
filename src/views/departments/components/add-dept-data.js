import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";
export default {
  data() {
    // 检测部门名称是否重复
    const checkNameRepeat = async (rule, value, callback) => {
      // value 是部门名称 要去和同级部门下的部门比较
      const { depts } = await getDepartments();
      let isRepeat = false

      // 跟据id判断编辑模式与新增模式
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增模式
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode?.id)
          .some((item) => item.name === value);
      }

      isRepeat
        ? callback(new Error(`同级部门下已经存在${value}部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.filter(item => item !== this.treeNode.id).some((item) => item.code === value && value);
      } else {
        // 新增模式
        isRepeat = depts.some((item) => item.code === value && value);

      }
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
    treeNode: {
      type: Object,
      default: null
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    // 获取详情方法
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // console.log('this.formData', this.formData);
    },
    btnOk() {
      this.$refs.deptForm.validate(async (isOk) => {
        if (isOk) {
          // 有id进行编辑 否则新增
          if (this.formData.id) {
            await uptateDepartments(this.formData)
          } else {
            // 将ID设置成pid
            await addDepartments({ ...this.formData, pid: this.treeNode?.id });
          }

          this.$emit("addDepts");
          // update:xxx sync修饰符
          this.$emit("update:showDialog", false);
        }
      });
    },

    btnCancel() {
      // 重置数据 resetFields只能重置表单上的数据 非表单上的 比如id不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // .sync修饰符
      this.$emit("update:showDialog", false);
      this.$refs.deptForm.resetFields()
    },
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  }
};
