import { defineStore } from "pinia";

const TAILWIND_MODE = Number(
  localStorage.getItem("TAILWIND_MODE") || 0
);
export const useTailWind = defineStore("tailwind", {
  state: () => {
    return {
      tailWindMode: TAILWIND_MODE,
    };
  },
  getters: {
    MODE(): number {
      return this.tailWindMode;
    },
  },
  actions: {
    SET_TAILWIND_MODE(mode: number) {
      this.tailWindMode = mode;
      localStorage.setItem("TAILWIND_MODE", String(mode));
    },
  },
});
