<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="isKeepAlive"></component>
    </keep-alive>
    <component :is="Component" v-if="!isKeepAlive"></component>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
let route = useRoute();
const isKeepAlive = computed<boolean>(() => !!route.meta.keepAlive);
</script>

<style></style>
