declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    TButton: typeof import("@/components/button/button");
  }
}

export {};
