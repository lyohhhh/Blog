import { defineComponent, PropType } from "vue";
import "@/styles/icon/index.css";

interface Icon {
  icon: string;
  class: string[];
}

export default defineComponent({
  name: "IconFont",
  props: {
    icon: {
      type: [] as PropType<Icon>,
      required: true,
    },
    styles: {
      type: [] as PropType<Icon[]>,
      required: true,
    },
  },

  render() {
    const icon = this.$props.icon;
    return <i class={["iconfont", `icon-${icon}`]}></i>;
  },
});
