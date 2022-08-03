<template>
    <div class="scrollAnimation" ref="scrollAnimationRef">
        <slot :visibility="state.visibility" :halfVisibility="state.halfVisibility" :crossed="state.crossed" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, defineProps } from 'vue';
import mitt from '@/utils/mitt'
import { useStore } from '@/store';


const scrollAnimationRef = ref<any>(null)

const props = defineProps<{
    defaultAnimation?: 'flyUp' | 'flyLeft' | 'flyRight'
}>()

const store = useStore()

const state = reactive({
    visibility: false,
    halfVisibility: false,
    crossed: false
})






const handleScroll = (e: any) => {
    const clientHeight = e?.target?.clientHeight
    const scrollTop = e?.target?.scrollTop;
    const offsetTop = scrollAnimationRef?.value?.offsetTop;
    state.visibility = (scrollTop + clientHeight - (offsetTop)) > clientHeight / 5;
    state.halfVisibility = (scrollTop + clientHeight - (offsetTop)) > (clientHeight / 2)
    state.crossed = (scrollTop + clientHeight - (offsetTop)) > clientHeight * 1.5
}

onMounted(() => {
    handleScroll({
        target: scrollAnimationRef?.value?.parentNode
    })
    mitt.on('scroll', handleScroll)
})

onUnmounted(() => {
    mitt.off('scroll', handleScroll)
})

</script>

<style scoped>
.scrollAnimation {
    /* overflow: hidden; */
}
</style>