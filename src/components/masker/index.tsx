import { defineComponent, PropType, Transition } from "vue";

import maskAnimate from "./mask.module.scss";

export default defineComponent({
  name: "mask",

  props: {
    show: {
      type: Boolean as PropType<boolean>,
    },
    lock: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const hiddenMask = () => {
      emit("change", false);
    };

    const touchHandle = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      if (props.lock) {
        return false;
      }
    };

    return {
      hiddenMask,
      touchHandle,
    };
  },
  render() {
    const props = this.$props;
    return (
      <Transition
        enterFromClass={maskAnimate["fade-enter"]}
        leaveToClass={maskAnimate["fade-enter"]}
        enterActiveClass={maskAnimate["fade-active"]}
        leaveActiveClass={maskAnimate["fade-active"]}
      >
        <div
          class={[
            "mask fixed left-0 right-0 top-0 bottom-0 select-none bg-black bg-opacity-60 z-10",
          ]}
          onTouchmove={this.touchHandle}
          onClick={this.hiddenMask}
          v-show={props.show}
          key={Number(props.show)}
        ></div>
      </Transition>
    );
  },
});
