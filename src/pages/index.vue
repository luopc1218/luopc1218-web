<template>
    <div class="indexPage">
        <n-spac class="moduleList">
            <n-space>
                <router-link :to="item.path" v-for="item in state.moduleList" :key="item.title">
                    <n-card class="module" :content-style="{ padding: 0 }">
                        <div class="title" :style="{ backgroundImage: `url(${item.pic})` }">
                            {{ item.title }}
                        </div>
                    </n-card>
                </router-link>

            </n-space>
        </n-spac>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useStore } from '@/store';


const state = reactive({
    moduleList: [
        {
            pic: 'https://mrd-global.net/img/photos/Cheetah_in_the_Masai_Mara,_Kenya-small.jpg',
            title: '博客',
            path: '/blog'
        },
        {
            pic: 'https://mrd-global.net/img/photos/Deep_in_thought_about_the_coming_joust-small.jpg',
            title: '论坛',
            path: '/bbs'
        }
    ]
})

const store = useStore()

onMounted(() => {
    store.commit('setTitle');
    store.commit('setPath', [])
})

</script>

<style lang="scss" scoped>
.indexPage {
    .moduleList {
        padding: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .module {
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

        .module:hover {
            filter: none;

            .title {
                left: 0;
            }
        }
    }
}
</style>    