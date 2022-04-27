import { delDepartments } from "@/api/departments";
export default {
  props: {
    treeNode: {
      type: Object,
      require: true,
      default: {},
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    operateDepts(type) {
      const types = {
        add: () => {
          this.$emit("addDepts", this.treeNode); // 触发自定义事件 告诉父组件 显示弹层
        },
        edit: () => {
          this.$emit('editDepts', this.treeNode)
        },
        del: () => {
          this.$confirm("你确定要删除该组织部门吗")
            .then(() => {
              return delDepartments(this.treeNode?.id);
            })
            .then(() => {
              this.$emit("delDepts");
              this.$message.success("删除部门成功");
            });
        },
      };
      return types[type]();
    },
  },
};
