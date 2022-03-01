<template>
  <div class="container font-bold flex">
    {{ name.state.tailwind.dark }}
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { StoreState } from "@/types/store";

let name = useStore<StoreState>();

console.log(name.state.tailwind.dark);
</script>

<style lang="scss" scoped></style>
