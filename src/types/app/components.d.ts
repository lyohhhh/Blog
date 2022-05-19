import * as Components from "@/components/components";

declare module "vue" {
  export interface GlobalComponents {
    RAside: typeof Components["RAside"];
    Button: typeof Components["Button"];
    Dialog: typeof Components["Dialog"];
    IconFont: typeof Components["IconFont"];
    List: typeof Components["List"];
    LoadingMore: typeof Components["LoadingMore"];
    Masker: typeof Components["Masker"];
    Navbar: typeof Components["Navbar"];
    SideBar: typeof Components["SideBar"];
    Skeleton: typeof Components["Skeleton"];
    [key: string]: any;
  }
}

export {};
