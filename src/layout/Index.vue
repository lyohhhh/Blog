<template>
  <div class="container m-auto">
    <div class="text-center bg-red-500 font-bold" @click="changeDark">
      点击切换模式
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch } from "vue";
import { useStore } from "vuex";
import { StoreState } from "@/types/store";

const store = useStore<StoreState>();
let dark: Ref<boolean | unknown> = ref<boolean | unknown>(
  store.state.tailwind.dark
);

watch(dark, (val) => {
  store.commit("tailwind/changeDark", val);
});

const changeDark = () => {
  dark.value = dark.value == 1 ? 0 : 1;
  console.log(111);
};
</script>

<style lang="scss" scoped></style>
