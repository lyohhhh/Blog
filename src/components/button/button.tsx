import { computed, defineComponent, PropType, renderSlot } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    size: {
      type: String as PropType<"xs" | "base" | "md" | "lg" | "xl">,
      default: "base",
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
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      const classByProps: string[] = [];
      classByProps.push(`button-${props.type}`);
      classByProps.push(`button-${props.size}`);
      if (props.disabled) classByProps.push("is-disabled");
      if (props.loading) classByProps.push("is-loading");
      return classByProps.join(" ");
    });

    return { buttonClass };
  },
  render() {
    return (
      <button class={["button", this.buttonClass]}>
        {renderSlot(this.$slots, "default")}
      </button>
    );
  },
});
