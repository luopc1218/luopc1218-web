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
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium illo sunt
                                        velit quae a, earum natus obcaecati vel, provident, dicta voluptatem sed
                                        explicabo qui id veniam quaerat? Eligendi consectetur distinctio quas deserunt
                                        minima a molestias magnam officiis laudantium nostrum delectus ratione animi aut
                                        omnis, iste assumenda! Commodi tempora sint exercitationem deserunt, maiores
                                        dolores animi delectus atque aliquam magni unde quibusdam odio repellat, eum
                                        voluptatum sit aspernatur neque aut reprehenderit, ullam ipsam quo sed esse!
                                        Aspernatur assumenda laudantium adipisci dolorum temporibus sint error ullam
                                        necessitatibus excepturi blanditiis totam at repellendus dolores nesciunt quam
                                        consequatur, quas veniam ab? Doloribus quidem libero earum, ullam eum
                                        repudiandae cum hic qui deleniti eos autem quia perspiciatis rerum blanditiis
                                        minus temporibus animi quo eius, nihil nemo aspernatur recusandae tempora.
                                        Sapiente rerum itaque, vel doloremque atque quaerat ut ea voluptate facilis a
                                        non ab, iure mollitia omnis rem corrupti adipisci dignissimos. Blanditiis
                                        delectus voluptatum vero sed corporis quidem. Odit aspernatur nulla quam laborum
                                        corporis culpa a eveniet, saepe ut eos consequatur quia architecto! Ipsum quasi
                                        nemo rerum neque. Asperiores vel non dignissimos. Nam fuga, autem architecto
                                        asperiores expedita sapiente iusto repudiandae sint consectetur maiores?
                                        Aspernatur incidunt distinctio officiis aut, dolore, provident eum nihil
                                        quibusdam, amet expedita ex?
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