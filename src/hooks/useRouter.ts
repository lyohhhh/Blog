import { useRouter } from "vue-router";
// import Routers from "@/router";
// import { watch } from "vue";

// const route = Routers.currentRoute.value;
// const routers = Routers;
// watch(
//   () => route.query,
//   (query) => {
//     console.log(query);
//   }
// );

interface TOptions {
  push: (path: string, params?: { [key: string]: any }, type?: number) => void;
  redirect: (path: string) => void;
}

const router = useRouter();

export const $T = {
  push(path, params, type = 1) {
    if (!path) return;
    router.push({
      path,
      [type == 1 ? "query" : "params "]: params,
    });
  },
  redirect(path) {
    if (!path) return;
    router.replace(path);
  },
} as TOptions;
