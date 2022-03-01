<template>
  <div class="container font-bold flex">
    {{ name.state.name }}
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { StoreState } from "@/types/store";

let name = useStore<StoreState>();
</script>

<style lang="scss" scoped></style>
