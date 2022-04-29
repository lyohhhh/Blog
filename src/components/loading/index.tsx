import { defineComponent, onMounted, ref, renderSlot } from "vue";
import props from "./props";
import { List } from "./observer";

export default defineComponent({
  name: "LoadingMore",
  props,
  setup() {
    const obs = ref<HTMLElement>();

    onMounted(() => {
      const observer = new List({
        root: null,
        obs: obs.value as HTMLElement,
        load() {
          console.log(1);
        },
      });
    });
    return {
      obs,
    };
  },

  render() {
    const porps = this.$props;
    return (
      <>
        {renderSlot(this.$slots, "default")}

        <div
          ref="obs"
          class="leading-loose text-center text-sm py-4 text-gray-600 dark:text-gray-500"
        >
          {porps.finished ? porps.finishedText : porps.loadingText}
        </div>
      </>
    );
  },
});
