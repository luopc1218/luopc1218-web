<template>
    <div class="scrollAnimation" ref="scrollAnimationRef">
        <div :class="props.defaultAnimation ? `animation-${props.defaultAnimation}` : ''">

        </div>
        <slot :visibility="state.visibility" :halfVisibility="state.halfVisibility" />
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
    halfVisibility: false
})






const handleScroll = (e: any) => {
    const clientHeight = e?.target?.clientHeight
    const scrollTop = e?.target?.scrollTop;
    const offsetTop = scrollAnimationRef?.value?.offsetTop;
    state.visibility = (scrollTop + clientHeight - (offsetTop - 24)) > 0;
    state.halfVisibility = (scrollTop + clientHeight - (offsetTop - 24)) > (clientHeight / 2)
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
</style>