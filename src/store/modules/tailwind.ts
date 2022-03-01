import { Module } from "vuex";
import { TailWind } from "@/types/store/tailwind";

const tailwind: Module<TailWind, any> = {
  namespaced: true,
  state() {
    return {
      dark: parseInt(localStorage.getItem("dark") as string) == 1 ? 1 : 0,
    };
  },
  getters: {},
  mutations: {
    changeDark(state: { dark: any }, dark: string) {
      state.dark = dark;
      localStorage.setItem("dark", dark);
    },
  },
  actions: {},
};

export default tailwind;
