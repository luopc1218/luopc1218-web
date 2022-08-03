<template>
    <div class="page">
        <BlogHeader />
        <div class="content">
            <div class="page">
                <router-view></router-view>
            </div>
            <div class="sider" v-if="!route.meta.hideSider">
                <n-card style="margin-bottom:1rem" class="adminInfo">
                    <n-divider style="margin:0 0 1rem 0">
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
                <n-card style="margin-bottom:1rem" v-if="store.state.user.adminMode">
                    <n-divider style="margin:0 0 1rem 0">
                        快捷操作
                    </n-divider>
                    <n-space>
                        <router-link to="/blog/write">
                            <n-button type="primary">
                                写文章
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
                <n-card>
                    <n-divider style="margin:0 0 1rem 0">
                        公告
                    </n-divider>
                    这里是{{ state.adminInfo?.name }}的个人博客，分享学习生活中的各种琐事，有问题欢迎探讨交流
                </n-card>

            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store';
import { apis, request } from '@/utils';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import BlogHeader from './components/BlogHeader.vue'

const route = useRoute()

const store = useStore()

const state = reactive<{
    adminInfo?: {
        avatarUrl: string,
        name: string,
    };
    getAdminInfoLoading: boolean
}>({
    adminInfo: undefined,
    getAdminInfoLoading: false
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

onMounted(() => {
    getAdminInfo()
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
        }
    }

}
</style>