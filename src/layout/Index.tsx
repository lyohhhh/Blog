import { computed, defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useMode } from "@/hooks/useMode";
// import style from "@/styles/layout/index.module.scss";

export default defineComponent({
  setup() {
    const tailwind = useMode();
    const isDark = computed(() => tailwind.mode.value == 1);

    return {
      changeTailWindMode: tailwind.changeTailWindMode,
      isDark,
    };
  },
  render() {
    return (
      <>
        <header
          class={[
            "shadow-lg fixed left-0 top-0 right-0 h-16  bg-white dark:bg-gray-900 dark:shadow-gray-700 md:px-0 md:",
          ]}
        >
          <div class="flex container px-4 m-auto h-full items-center justify-between dark:text-gray-300 md:w-full md:px-0">
            <div class="">left</div>
            <div class="icon-wrapper flex items-center">
              <icon-font
                onClick={this.changeTailWindMode}
                class={[
                  "text-xl cursor-pointer text-right fill-current max-h-full",
                  this.isDark ? "text-yellow-300" : "text-gray-700",
                ]}
                icon={this.isDark ? "wb_sunny" : "dark"}
              ></icon-font>
            </div>
          </div>
        </header>
        <div class="container m-auto pt-20 pb-10 px-4 md:px-0 md:pt-24">
          <RouterView></RouterView>
        </div>
      </>
    );
  },
});
