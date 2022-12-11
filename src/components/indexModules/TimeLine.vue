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
                    <n-timeline-item content="啊" />
                    <n-timeline-item type="success" title="成功" content="哪里成功" time="2018-04-03 20:46" />
                    <n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46" />
                    <n-timeline-item type="warning" title="警告" content="哪里警告" time="2018-04-03 20:46" />
                    <n-timeline-item type="info" title="信息" content="是的" time="2018-04-03 20:46" line-type="dashed" />
                    <n-timeline-item content="啊" />
                </n-timeline>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store';

const store = useStore()


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