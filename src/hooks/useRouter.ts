// import { useRouter } from "vue-router";
// 使用 useRouter 放在 setup 中才能获取到对应的值
// ---> 这里的 useRouter 为 undefined
import Routers from "@/router";
interface TOptions {
  push: (path: string, params?: { [key: string]: any }, type?: number) => void;
  redirect: (path: string) => void;
}

// const router = useRouter();

export const $T = {
  push(path, params, type = 1) {
    if (!path) return;
    Routers.push({
      path,
      [type == 1 ? "query" : "params"]: params,
    });
  },
  redirect(path) {
    if (!path) return;
    Routers.replace(path);
  },
} as TOptions;
