<template>
  <div class="index">
    <IndexHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IndexHeader from './components/IndexHeader.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { IndexHeader }
});
</script>
