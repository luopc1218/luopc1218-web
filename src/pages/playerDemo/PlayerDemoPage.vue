<template>
    <div>
        <ScrollVideo :videoList="videoList" />
    </div>
</template>
<script lang="ts">
import ScrollVideo from '@/components/ScrollVideo.vue'
import { reactive } from 'vue'

export default {
    components: { ScrollVideo },
    setup() {
        const videoList = reactive([
            "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            "http://vjs.zencdn.net/v/oceans.mp4",
            "https://media.w3.org/2010/05/sintel/trailer.mp4",
            "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        ])

        return {
            videoList
        }
    }
}
</script>
<style lang="">
    
</style>