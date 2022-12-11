<template>
  <div>test</div>
</template>

<script setup lang="ts">
  import store from "@/store";
  import { onMounted } from "vue";

  onMounted(() => {
    store.commit("setTitle");
    store.commit("setPath", [
      {
        title: "系统管理",
        url: "/system",
      },
    ]);
  });
</script>

<style scoped></style>
