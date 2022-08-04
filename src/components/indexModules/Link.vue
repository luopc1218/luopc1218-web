<template>
    <ScrollAnimation>

        <template v-slot:default="slotProps">

            <div class="link" :style="{ minHeight: `calc(100vh - ${store.state.headerHeight}px)` }"
                :class="{ 'link-visibility': slotProps.visibility, 'link-halfVisibility': slotProps.halfVisibility, 'link-crossed': slotProps.crossed }">
                <div class="title">
                    链接
                </div>
                <n-space class="linkList" justify="center" align="center">
                    <router-link :to="item.path" v-for="item, index in state.linkList" :key="item.title">
                        <n-card class="linkItem" :content-style="{ padding: 0 }" hoverable
                            :style="{ 'transition-delay': slotProps.halfVisibility ? `${index / 10}s` : '0s' }">
                            <div class="background" :style="{ backgroundImage: `url(${item.pic})` }">
                                <div class="linkItemtitle">
                                    {{ item.title }}
                                </div>
                            </div>

                        </n-card>
                    </router-link>
                </n-space>
            </div>
        </template>
    </ScrollAnimation>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store';

const store = useStore()

const state = reactive({
    linkList: [
        {
            pic: require('@/assets/images/Cheetah_in_the_Masai_Mara,_Kenya-small.jpg'),
            title: '博客',
            path: '/blog'
        },
        {
            pic: require('@/assets/images/Deep_in_thought_about_the_coming_joust-small.jpg'),
            title: '论坛',
            path: '/bbs'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '开发中',
            path: '/'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '开发中',
            path: '/'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '开发中',
            path: '/'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '论坛',
            path: '/'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '论坛',
            path: '/'
        }, {
            pic: require('@/assets/images/Developing.jpg'),
            title: '开发中',
            path: '/'
        },
    ]
})
</script>

<style lang="scss" scoped>
.link {
    opacity: 0;
    transform: translateY(100px);
    position: relative;
    transition: all 1s ease;


    .title {
        text-align: center;
        padding: 1rem;
        font-size: 36px;
    }

    .linkList {
        width: 100%;

        .linkItem {
            position: relative;
            overflow: hidden;
            width: 400px;
            height: 400px;
            filter: blur(1.5px) grayscale(100%);
            opacity: 0;
            transition: all .3s ease;


            .background {
                width: 120%;
                height: 120%;
                background-size: 150% auto;
                background-repeat: no-repeat;
                position: relative;
                left: -20%;
                transition: all .3s ease;
            }

            .linkItemtitle {
                padding: 1rem;
                color: #fff;
                font-size: 25px;
                font-weight: bolder;

            }
        }

        .linkItem:hover {
            filter: none;

            .background {
                left: 0;
            }
        }
    }

    &-halfVisibility {
        opacity: 1;
        transform: none;

        .linkList {
            .linkItem {
                opacity: 1;

            }
        }

    }

    &-crossed {
        // transform: translateY(-100px);
    }




}
</style>