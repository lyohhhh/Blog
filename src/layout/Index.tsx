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
import {
  Dialog,
  Form,
  FormItem,
  IconFont,
  Input,
  Navbar,
  Sidebar,
} from "@/components/components";

export const Layout = defineComponent({
  setup() {
    const tailwind = useMode();
    const isMobile = useResize();
    const isDark = computed(() => tailwind.mode.value == 1);
    const category = reactive<Tree[]>([]);
    const isCollapse = ref<boolean>(false);
    const dialogVisible = ref<boolean>(true);
    const testInput = ref<string>("");
    const loginForm = reactive<{
      userName: string;
      password: string;
    }>({
      userName: "",
      password: "",
    });

    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    });

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
      testInput,
      loginForm,
      rules,
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
          {renderHeaderMain.call(this)}
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
            default: () => (
              <Form labelSuffix=":" rules={this.rules} model={this.loginForm}>
                <FormItem label="账号" prop="userName">
                  <Input v-model={this.loginForm.userName}></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <Input
                    type="password"
                    v-model={this.loginForm.password}
                  ></Input>
                </FormItem>
              </Form>
            ),
          }}
        ></Dialog>
      </>
    );
  },
});

/**
 * 渲染 Header
 */
function renderHeaderMain(this: InstanceType<typeof Layout>) {
  return (
    <div class="flex container px-4 m-auto h-full items-center justify-between dark:text-gray-300 md:w-full sm:px-0 ">
      <div class="block sm:hidden cursor-pointer" onClick={this.collapseHandle}>
        <IconFont icon="view_list-o" class="font-medium text-xl"></IconFont>
      </div>
      <span class="font-mono text-xl lg:text-2xl">BLOG</span>

      {renderBar.call(this)}
    </div>
  );
}

/**
 * 电脑 Navbar
 * 手机 Sidebar
 */
function renderBar(this: InstanceType<typeof Layout>) {
  return (
    <>
      {this.isMobile ? (
        <Sidebar v-model={this.isCollapse} category={this.category}></Sidebar>
      ) : (
        <Navbar
          category={this.category}
          class="inline-flex flex-1 justify-end left-0 top-0 bottom-0 right-0 w-full"
        ></Navbar>
      )}
      <div class="icon-wrapper flex items-center ">
        <IconFont
          onClick={this.changeTailWindMode}
          class={[
            "text-xl cursor-pointer text-right max-h-full",
            this.isDark ? "text-yellow-300" : "text-gray-700",
          ]}
          icon={this.isDark ? "wb_sunny" : "dark"}
        ></IconFont>
      </div>
    </>
  );
}

export default Layout;
