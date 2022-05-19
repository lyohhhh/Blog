import { defineComponent, PropType } from "vue";
import "@/styles/icon/index.css";

export default defineComponent({
  name: "IconFont",
  props: {
    icon: {
      type: String,
      required: true,
    },
    styles: {
      type: [] as PropType<string[]>,
      required: false,
    },
    onClick: {
      type: Function,
    },
  },

  render() {
    const icon = this.$props.icon;
    return <i class={["iconfont", `icon-${icon}`]}></i>;
  },
});
