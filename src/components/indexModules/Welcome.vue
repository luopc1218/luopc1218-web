<template>
    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <div class="welcome supportDark" :style="{ minHeight: `calc(100vh - ${store.state.headerHeight}px)` }"
                :class="{ 'welcome-crossed': slotProps.crossed }">
                <div class="text">
                    Welcome,
                </div>
                <div class="text">
                    Luopc1218.
                </div>
            </div>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store/';

const store = useStore()


</script>

<style lang="scss" scoped>
@keyframes flyLeft {
    from {
        opacity: 0;
        transform: translateX(-100vw);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes flyRight {
    from {
        opacity: 0;
        transform: translateX(100vw);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes allochromasia {
    from {
        background-position: 300%;

    }

    to {
        background-position: 0%;
    }
}


.welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 1s ease;
    // background-color: var(--primary-color);

    .text {
        font-size: 88px;
        transition: transform 1s ease;
        background-clip: text;
        /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;
        /* 防止字体颜色覆盖 */
        background-image: linear-gradient(to right, var(--primary-color), var(--base-color), var(--primary-color));
        background-size: 300%;


    }

    .text:nth-child(2n+1) {
        animation: flyRight 1s ease, allochromasia 5s linear infinite;
    }

    .text:nth-child(2n) {
        animation: flyLeft 1s ease, allochromasia 5s linear infinite;
    }

    &-crossed {
        opacity: 0;

        .text:nth-child(2n+1) {
            transform: translateX(-100%);
        }

        .text:nth-child(2n) {
            transform: translateX(100%);
        }
    }
}
</style>