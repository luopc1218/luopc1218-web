<template>
    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <n-space class="about" vertical align="center"
                :style="{ minHeight: `calc(100vh - ${store.state.headerHeight}px)` }"
                :class="{ 'about-visibility': slotProps.visibility, 'about-halfVisibility': slotProps.halfVisibility, 'about-crossed': slotProps.crossed }">
                <div class="title">
                    关于
                </div>
                <n-card class="aboutContent">
                    <div v-for="item in props.indexData.abouts" :key="item.key">
                        {{item.key}}：<a :href="item.value">{{item.value}}</a>
                    </div>
                </n-card>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { IndexData } from '@/pages/index.vue';
import { useStore } from '@/store';
import { NSpace, NCard } from 'naive-ui';
import { defineProps } from 'vue'

const store = useStore()

const props = defineProps<{ indexData: IndexData }>()



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

    &-visibility {
        opacity: 1;
        transform: none
    }

}
</style>