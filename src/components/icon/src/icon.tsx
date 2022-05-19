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
  },
  emits: ["click"],
  setup(props, { emit }) {
    const emitClick = (...args: any[]) => {
      emit("click", args);
    };
    return () => (
      <i onClick={emitClick} class={["iconfont", `icon-${props.icon}`]}></i>
    );
  },
});
