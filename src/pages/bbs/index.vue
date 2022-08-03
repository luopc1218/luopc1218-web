<template>
    <n-element class="home">
        <div class="banner" :style="{ 'background-image': `url(${state.banner})` }">
            {{ state.joke }}
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </n-element>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useStore } from '@/store';

const state = reactive({
    banner: "",
    joke: ""
})

const getBanner = () => {
    axios.get('https://api.btstu.cn/sjbz/api.php', {
        params: {
            lx: 'dongman',
            format: "json"
        }
    }).then(res => {
        console.log(res);
        state.banner = res.data.imgurl
    })
}

const getJoke = () => {
    axios.get('https://api.ooomn.com/api/yan', {
        params: {
            encode: "json"
        }
    }).then(res => {
        state.joke = res.data.hitokoto
    })
}

const store = useStore()



onMounted(() => {

    store.commit('setTitle', 'Luopc1218\'s BBS')
    store.commit('setPath', [{ title: "论坛", url: '/bbs' }])

    getJoke()
    getBanner()
})

</script>
<style lang="scss" scoped>
.home {
    .banner {
        background-size: contain 100%;
        background-position: center;
        background-repeat: repeat;
        height: 190px;
        color: var(--primary-color);
        font-size: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff; //设置发光效果
    }

    .content {
        padding: 12px;

        .statistics {
            opacity: .5;
        }

    }
}
</style>