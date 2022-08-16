<template>
    <div class="page">
        <div class="content">
            <div class="page">
                <router-view></router-view>
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
                            <n-space>
                                <div>文章：0</div>
                                <div>回复：0</div>
                                <div>标签：0</div>
                            </n-space>
                        </div>

                    </n-spin>
                </n-card>
                <n-card class="siderItem" v-if="store.state.user.adminMode">
                    <n-divider class="title">
                        快捷操作
                    </n-divider>
                    <n-space>
                        <router-link to="/blog/article/add">
                            <n-button type="primary">
                                发表文章
                            </n-button>
                        </router-link>
                        <n-button>
                            我的文章
                        </n-button>
                        <n-button>
                            我的回复
                        </n-button>
                    </n-space>
                </n-card>
                <n-card class="siderItem">
                    <n-divider class="title">
                        公告
                    </n-divider>
                    <n-spin :show="state.getNoticeLoading">
                        <div v-if="state.notice" class="notice">
                            {{ state.notice.content }}
                            <div style="text-align:right">
                                <div>
                                    ——— {{ state.notice.authorName }}
                                </div>
                                <div class="time">
                                    {{ formatTime(state.notice.createTime) }}
                                </div>
                            </div>
                        </div>
                        <n-empty v-else />
                    </n-spin>
                </n-card>
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

const route = useRoute()

const store = useStore()

const state = reactive<{
    adminInfo?: {
        avatarUrl: string,
        name: string,
    };
    getAdminInfoLoading: boolean;
    getNoticeLoading: boolean;
    notice: any,
    getHotArticleListloading: boolean,
    hotArticleList: any[]
}>({
    adminInfo: undefined,
    getAdminInfoLoading: false,
    getNoticeLoading: false,
    notice: undefined,
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

const getNotice = async () => {
    state.getNoticeLoading = true;
    try {
        const notice = await request(apis.getNotice)
        if (notice) {
            state.notice = notice
        }
        state.getNoticeLoading = false
    } catch (error) {
        state.getNoticeLoading = false
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
    getNotice()
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

            .notice {
                .time {
                    font-size: 12px;
                    opacity: .8;
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