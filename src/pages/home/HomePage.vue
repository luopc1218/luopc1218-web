<template>
    <n-element class="home">
        <div class="banner" :style="{ 'background-image': `url(${state.banner})` }">
            {{ state.joke }}
        </div>
        <div class="content">
            <n-grid x-gap="12" y-gap="12" :cols="4">
                <n-gi :span="4">
                    <n-space class="statistics">
                        <div>今日: 0</div>
                        <div>昨日: 0</div>
                        <div>帖子: 0</div>
                        <div>会员: 0 </div>
                        <div>欢迎您: luopc1218</div>
                    </n-space>
                </n-gi>
                <n-gi :span="3">
                    <n-grid x-gap="12" y-gap="12" :cols="1">
                        <n-gi :span="1">
                            <n-card>
                                <div class="title">收藏版面</div>
                                <n-empty></n-empty>
                            </n-card>
                        </n-gi>
                        <n-gi :span="1">
                            <n-card>
                                <div class="title">热门版面</div>
                                <n-empty></n-empty>
                            </n-card>
                        </n-gi>
                    </n-grid>

                </n-gi>
                <n-gi :span="1">
                    <n-grid x-gap="12" y-gap="12" :cols="1">
                        <n-gi :span="1">
                            <div class="announcement">
                                <n-card>
                                    <n-space>
                                        <n-button type="primary" secondary strong @Click="handlePost">发帖</n-button>
                                    </n-space>
                                </n-card>
                            </div>
                        </n-gi>
                        <n-gi :span="1">
                            <div class="announcement">
                                <n-card>
                                    <div class="title">
                                        公告
                                    </div>
                                    <div>
                                        <img src="https://api.btstu.cn/netcard/api.php" style="width:100%" alt="">
                                    </div>
                                </n-card>
                            </div>
                        </n-gi>

                    </n-grid>

                </n-gi>
            </n-grid>
        </div>

    </n-element>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

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

const handlePost = () => {
}

onMounted(() => {
    getJoke()
    getBanner()
})

</script>
<style lang="scss" scoped>
.home {
    .banner {
        background-size: contain 100%;
        background-repeat: repeat;
        height: 190px;
        color: var(--primary-color);
        font-size: 24px;
        font-family: fantasy;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        padding: 12px;

        .statistics {
            opacity: .5;
        }

    }
}
</style>