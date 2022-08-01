<template>
    <ScrollAnimation>
        <div class="linkList">
            <n-divider>
                链接
            </n-divider>
            <div>
                <n-space>
                    <router-link :to="item.path" v-for="item, index in state.linkList" :key="item.title">
                        <n-card class="link" :content-style="{ padding: 0 }"
                            :style="{ animationDelay: `${index / 2}s` }">
                            <div class="title" :style="{ backgroundImage: `url(${item.pic})` }">
                                {{ item.title }}
                            </div>
                        </n-card>
                    </router-link>
                </n-space>
            </div>
        </div>
    </ScrollAnimation>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'

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
        }
    ]
})
</script>

<style lang="scss" scoped>
.linkList {
    position: relative;
    transform: translateY(100px);
    transition: all .3s ease;

    .link {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        width: 400px;
        height: 400px;
        filter: blur(1.5px) grayscale(100%);
        transition: filter .3s ease;


        .title {
            width: 120%;
            height: 100%;
            padding: 1rem;
            // height: 100%;
            color: #fff;
            position: absolute;
            left: -20%;
            transition: left .3s ease;
            font-size: 25px;
            font-weight: bolder;
            background-size: 100% auto;
            background-repeat: no-repeat;
        }
    }

    .link:hover {
        filter: none;

        .title {
            left: 0;
        }
    }

}
</style>