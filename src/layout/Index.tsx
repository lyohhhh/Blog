import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useMode } from "@/hooks/useMode";
import style from "@/styles/layout/index.module.scss";

export default defineComponent({
  setup() {
    return {
      ...useMode(),
    };
  },
  render() {
    return (
      <>
        <header
          class={[
            "shadow-lg fixed left-0 top-0 right-0 h-16 bg-white dark:bg-gray-800 dark:shadow-gray-700",
            style.header,
          ]}
        >
          <div class="flex container m-auto h-full items-center justify-between dark:text-gray-100">
            <div class="">left</div>
            <div onClick={this.changeTailWindMode}>切换主题</div>
          </div>
        </header>
        <div class="container m-auto mt-24">
          <RouterView></RouterView>
        </div>
      </>
    );
  },
});
