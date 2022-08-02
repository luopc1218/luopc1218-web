<template>
    <div class="indexPage">
        <Welcome />
        <Link />
        <TimeLine />
        <About />
        <Message />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import Welcome from '@/components/indexModules/Welcome.vue'
import About from '@/components/indexModules/About.vue'
import Link from '@/components/indexModules/Link.vue'
import Message from '@/components/indexModules/Message.vue'
import TimeLine from '@/components/indexModules/TimeLine.vue'

const store = useStore()

onMounted(() => {
    store.commit('setTitle');
    store.commit('setPath', [])
})

</script>

<style lang="scss" scoped>
.indexPage {
    padding: 1rem;
}
</style>    