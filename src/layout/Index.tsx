import {
  computed,
  defineComponent,
  reactive,
  ref,
  KeepAlive,
  VNode,
} from "vue";

import { RouterView } from "vue-router";
import { useMode } from "@/hooks/useMode";
import { useResize } from "@/hooks/useResize";
import { Request } from "@/api";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Dialog from "@/components/dialog/dialog";

export default defineComponent({
  setup() {
    const tailwind = useMode();
    const isMobile = useResize();
    const isDark = computed(() => tailwind.mode.value == 1);
    const category = reactive<Tree[]>([]);
    const isCollapse = ref<boolean>(false);
    const dialogVisible = ref<boolean>(false);

    Request.get("/api/category", null).then(({ data }) => {
      category.push(...data);
    });

    const collapseHandle = () => {
      isCollapse.value = !isCollapse.value;
    };

    return {
      changeTailWindMode: tailwind.changeTailWindMode,
      collapseHandle,
      isDark,
      isMobile,
      category,
      isCollapse,
      dialogVisible,
    };
  },
  render() {
    return (
      <>
        <header
          class={[
            "shadow-lg fixed left-0 top-0 right-0 h-16 z-10 bg-white dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700",
          ]}
        >
          <div class="flex container px-4 m-auto h-full items-center justify-between dark:text-gray-300 md:w-full sm:px-0 ">
            <div
              class="block sm:hidden cursor-pointer"
              onClick={this.collapseHandle}
            >
              <icon-font
                icon="view_list-o"
                class="font-medium text-xl"
              ></icon-font>
            </div>
            <span class="font-mono text-xl lg:text-2xl">BLOG</span>

            {this.isMobile ? (
              <Sidebar
                v-model={this.isCollapse}
                category={this.category}
              ></Sidebar>
            ) : (
              <Navbar
                category={this.category}
                class="inline-flex flex-1 justify-end left-0 top-0 bottom-0 right-0 w-full"
              ></Navbar>
            )}
            <div class="icon-wrapper flex items-center ">
              <icon-font
                onClick={this.changeTailWindMode}
                class={[
                  "text-xl cursor-pointer text-right max-h-full",
                  this.isDark ? "text-yellow-300" : "text-gray-700",
                ]}
                icon={this.isDark ? "wb_sunny" : "dark"}
              ></icon-font>
            </div>
          </div>
        </header>
        <div class="container m-auto pt-20 pb-10 px-0 md:px-0 md:pt-24">
          <RouterView>
            {(props: { Component: VNode }) => {
              return <KeepAlive>{props.Component}</KeepAlive>;
            }}
          </RouterView>
        </div>
        <Dialog
          v-model={this.dialogVisible}
          v-slots={{
            title: () => "登录",
          }}
        ></Dialog>
      </>
    );
  },
});
