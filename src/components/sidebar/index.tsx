import { defineComponent, PropType, Transition } from "vue";

import Mask from "@/components/masker";

import sideAnimate from "./side.module.scss";

export default defineComponent({
  name: "sideBar",
  props: {
    category: {
      type: [] as PropType<Tree[]>,
      required: true,
    },
    modelValue: {
      type: Boolean as PropType<boolean>,
    },
  },
  emits: ["update:modelValue"],
  setup(ctx, { emit }) {
    const changeCollapse = (flag: boolean) => {
      emit("update:modelValue", flag);
    };
    return {
      changeCollapse,
    };
  },

  render() {
    const props = this.$props;
    return (
      <>
        <Transition
          enterFromClass={sideAnimate["translate-enter"]}
          leaveToClass={sideAnimate["translate-enter"]}
          enterActiveClass={sideAnimate["translate-active"]}
          leaveActiveClass={sideAnimate["translate-active"]}
        >
          <aside
            class="fixed top-0 left-0 bottom-0 w-1/2 bg-white z-20"
            v-show={props.modelValue}
          >
            <main class="side-main w-3/4"></main>
          </aside>
        </Transition>

        <Mask show={props.modelValue} onChange={this.changeCollapse}></Mask>
      </>
    );
  },
});
