<template>
    <div class="page">
        <div class="content">
            <div class="page">
                <router-view :key="route.fullPath"></router-view>
            </div>
            <div class="sider" v-if="!route.meta.hideSider">
                <n-card class="siderItem adminInfo">
                    <n-divider class="title">
                        博主信息
                    </n-divider>
                    <n-spin :show="state.getAdminInfoLoading">
                        <n-empty v-if="!state.adminInfo" />
                        <div v-else style="text-align:center;">

                            <div>
                                <n-avatar class="avatar" :src="state.adminInfo.avatarUrl"></n-avatar>
                            </div>
                            <div class="name">{{ state.adminInfo?.name }}</div>
                            <n-space justify="center">
                                <div>文章：0</div>
                                <div>回复：0</div>
                                <div>标签：0</div>
                            </n-space>
                        </div>

                    </n-spin>
                </n-card>
                <n-card class="siderItem">
                    <n-divider class="title">
                        快捷操作
                    </n-divider>
                    <n-space justify="center" v-if="store.state.user.userInfo">
                        <router-link to="/blog/article/add" v-if="store.state.user.adminMode">
                            <n-button type="primary">
                                发表文章
                            </n-button>
                        </router-link>
                        <router-link :to="{
                            name: 'profile',
                            params: {
                                tab: 'myArticle'
                            }
                        }">
                            <n-button>
                                我的文章
                            </n-button>
                        </router-link>
                        <router-link :to="{
                            name: 'profile',
                            params: {
                                tab: 'myFavorite'
                            }
                        }">
                            <n-button>
                                我的收藏
                            </n-button>
                        </router-link>
                    </n-space>
                </n-card>
                <Notice />
                <n-card class="siderItem">
                    <n-divider class="title">
                        热门文章
                    </n-divider>
                    <n-spin :show="state.getHotArticleListloading">
                        <n-space vertical v-if="state.hotArticleList.length > 0" class="hotArticleList">
                            <router-link :to="`/blog/article?id=${item.id}`" v-for="item, index in state.hotArticleList"
                                class="articleItem" :key="item.id">
                                <div class="title">
                                    {{ item.title }} <i v-if="index <= 2" style="color:red" class="icon-hot-fill"></i>
                                </div>
                            </router-link>
                        </n-space>
                        <n-empty v-else></n-empty>
                    </n-spin>
                </n-card>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store';
import { apis, request, formatTime } from '@/utils';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Notice from './components/Notice.vue'

const route = useRoute()

const store = useStore()

const state = reactive<{
    adminInfo?: {
        avatarUrl: string,
        name: string,
    };
    getAdminInfoLoading: boolean;
    getHotArticleListloading: boolean,
    hotArticleList: any[]
}>({
    adminInfo: undefined,
    getAdminInfoLoading: false,
    getHotArticleListloading: false,
    hotArticleList: []
})



const getAdminInfo = async () => {
    state.getAdminInfoLoading = true;
    try {
        const adminInfo = await request(apis.getAdminInfo)
        if (adminInfo) {
            state.adminInfo = adminInfo;
        }
        state.getAdminInfoLoading = false;
    } catch (error) {
        state.getAdminInfoLoading = false;
    }
}


const getHotArticleList = async () => {
    state.getHotArticleListloading = true;
    try {
        const hotArticleList = await request(apis.getHotArticleList)
        if (hotArticleList) {
            state.hotArticleList = hotArticleList
        }
        state.getHotArticleListloading = false
    } catch (error) {
        state.getHotArticleListloading = false
    }
}

onMounted(() => {
    store.commit('setTitle', 'Luopc1218\'s Blog');
    getAdminInfo();
    getHotArticleList()
})

</script>
<style lang="scss" scoped>
.page {
    .content {
        display: flex;
        padding: 1rem;

        .page {
            flex: 1
        }

        .sider {
            width: 20%;
            margin-left: 1rem;

            .siderItem {
                margin-bottom: 1rem;

                .title {
                    margin: 0 0 1rem 0
                }
            }



            .adminInfo {
                .avatar {
                    width: 140px;
                    height: 140px;
                    cursor: pointer;
                    transition: all 1s ease;
                }



                .name {
                    margin: 1rem;
                    font-size: 18px;
                    font-weight: bolder;
                }
            }

            .adminInfo:hover {
                .avatar {
                    transform: rotateY(180deg);
                }
            }



            .hotArticleList {
                .articleItem {
                    color: var(--primary-color)
                }
            }
        }
    }

}
</style>