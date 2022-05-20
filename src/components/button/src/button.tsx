import { IconFont } from "@/components/components";
import { computed, defineComponent, PropType, renderSlot } from "vue";
import ButtonStyles from "../styles/button.moudle.scss";
// console.log(ButtonStyles);
ButtonStyles;
export default defineComponent({
  name: "Button",
  props: {
    size: {
      type: String as PropType<"xs" | "sm" | "base" | "lg" | "xl">,
      default: "sm",
    },
    type: {
      type: String as PropType<
        "success" | "default" | "warning" | "primary" | "danger"
      >,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const buttonClass = computed(() => {
      const classByProps: string[] = [];
      classByProps.push(`button--${props.type}`);
      classByProps.push(`button--${props.size}`);
      if (props.disabled) classByProps.push("is-disabled");
      if (props.loading) classByProps.push("is-loading");
      if (props.circle) classByProps.push("is-circle");
      return classByProps.join(" ");
    });

    const emitClick = (...args: any[]) => {
      if (props.loading || props.disabled) return;
      emit("click", args);
    };

    return { buttonClass, emitClick };
  },
  render() {
    const props = this.$props;
    return (
      <button class={["button", this.buttonClass]} onClick={this.emitClick}>
        <span>
          {renderSlot(this.$slots, "default")}
          {props.loading && <IconFont icon="loading"></IconFont>}
        </span>
      </button>
    );
  },
});
