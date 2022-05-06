import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "sideBar",
  props: {
    category: {
      type: [] as PropType<Tree[]>,
      required: true,
    },
  },
});
