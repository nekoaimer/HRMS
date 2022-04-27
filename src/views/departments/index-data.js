import TreeTools from "./components/tree-tools";
import AddDept from "./components/add-dept.vue";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";
export default {
  data() {
    return {
      company: { name: "江苏传智播客教育科技股份有限公司", manager: "负责人" },
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }],
        },
        { name: "行政部", manager: "刘备" },
        { name: "人事部", manager: "孙权" },
      ],
      defaultProps: {
        label: "name",
        children: "children",
      },
      showDialog: false, // 默认不显示弹层
      node: null, // 记录放弃点击的node节点
      treeNode: {},
    };
  },
  components: {
    TreeTools,
    AddDept,
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      console.log(result, 55);
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      // this.departs = result.depts;
      this.departs = tranListToTreeData(result.depts, "");
      // console.log(, 22);
    },
    addDepts(node) {
      this.showDialog = true;
      this.node = node;
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  },
};
