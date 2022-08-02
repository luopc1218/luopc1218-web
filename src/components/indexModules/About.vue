<template>
    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <n-space class="about" vertical align="center"
                :style="{ minHeight: `calc(100vh - ${store.state.headerHeight}px)` }"
                :class="{ 'about-visibility': slotProps.visibility, 'about-halfVisibility': slotProps.halfVisibility, 'about-crossed': slotProps.crossed }">
                <div class="title">
                    想了解更多？
                    你需要的都在这里。
                </div>
                <n-card class="aboutContent">
                    <div>
                        邮箱：<a href="mailto:luopc1218@outlook.com">luopc1218@outlook.com</a>
                    </div>
                    <div>
                        Github：<a href="https://github.com/luopc1218">https://github.com/luopc1218</a>
                    </div>
                </n-card>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store';

const store = useStore()


</script>

<style lang="scss" scoped>
.about {
    opacity: 0;
    transition: all 1s ease;
    transform: translateY(100px);

    .title {
        font-size: 36px;
        transition: all 1s ease;
    }

    .aboutContent {
        // width: 50%;
        // padding: 1rem;

    }

    &-halfVisibility {
        opacity: 1;
        transform: none
    }

}
</style>