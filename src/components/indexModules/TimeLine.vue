<template>
    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <n-space class="timeLine" align="center" justify="center"
                :style="{ minHeight: `calc(100vh - ${store.state.headerHeight}px)` }"
                :class="{ 'timeLine-visibility': slotProps.visibility, 'timeLine-halfVisibility': slotProps.halfVisibility, 'timeLine-crossed': slotProps.crossed }">
                <div class="title">
                    时间线
                </div>
                <n-timeline class="timeLineContent">
                    <n-timeline-item v-for="item in props.indexData.paths" :title="item.title" :key="item.time"
                        :content="item.description" :time="item.time" />
                </n-timeline>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { IndexData } from '@/pages/index.vue';
import { useStore } from '@/store';
import { NSpace, NTimeline, NTimelineItem } from 'naive-ui';

const store = useStore()

const props = defineProps<{ indexData: IndexData }>()



</script>

<style lang="scss" scoped>
.timeLine {
    // transform: translateY(50%);
    opacity: .3;
    transition: all 1s ease;

    .title {
        text-align: center;
        padding: 1rem;
        font-size: 36px;
        transform: translateX(-100px);
        transition: all 1s ease;
    }

    .timeLineContent {
        transform: translateX(100px);
        transition: all 1s ease;
    }

    &-halfVisibility {
        opacity: 1;

        .title {
            transform: none;
        }

        .timeLineContent {
            transform: none;
        }
    }

}
</style>