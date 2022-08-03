<template>
    <div class="page">
        <Welcome />
        <Link />
        <TimeLine />
        <About />
        <LeaveMessage />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import Welcome from '@/components/indexModules/Welcome.vue'
import About from '@/components/indexModules/About.vue'
import Link from '@/components/indexModules/Link.vue'
import LeaveMessage from '@/components/indexModules/LeaveMessage.vue'
import TimeLine from '@/components/indexModules/TimeLine.vue'

const store = useStore()

onMounted(() => {
    store.commit('setTitle');
    store.commit('setPath', [])
})

</script>

<style lang="scss" scoped>
.page {
    // padding: 1rem;
}
</style>    