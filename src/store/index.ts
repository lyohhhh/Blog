import { createStore } from "vuex";
import { StoreState } from "@/types/store";

const store = createStore<StoreState>({
  state() {
    return {
      name: "test",
    };
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
