<template>
    <div class="scrollVideo" @touchend="handleTouchEnd" @touchstart="handleTouchStart">
        <video :id="`player${index}`" class="player" v-for="(src, index) in renderedVideo" :src="src"
            :key="src"></video>
    </div>
</template>
<script lang="ts">
import { computed, ref } from "vue"

export default {
    props: {
        videoList: Array
    },

    setup(props) {
        const videoHeight = 600;

        const handleTouchStart = (e) => {
            document.getElementById(`player${activeIndex.value}`)?.pause()
        }

        const handleTouchEnd = (e) => {
            activeIndex.value = Math.round(e.currentTarget.scrollTop / videoHeight)
            document.getElementById(`player${activeIndex.value}`)?.play()
            e.currentTarget.scrollTop = activeIndex.value * videoHeight
        }
        const activeIndex = ref(0)
        const renderedVideo = computed(() => props.videoList)
        return {
            renderedVideo,
            activeIndex,
            handleTouchStart,
            handleTouchEnd
        }
    }
}
</script>
<style lang="scss">
.scrollVideo {
    // width: 800px;
    height: 600px;
    overflow: auto;


    .player {
        display: block;
        // width: 800px;
        height: 600px;
    }
}
</style>