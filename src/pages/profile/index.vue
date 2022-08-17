<template>
    <div class="profile">
        <n-card class="userInfo">
            <n-spin :show="state.getUserInfoLoading">
                <div v-if="state.userInfo">
                    <n-space align="center">
                        <n-avatar :src="state.userInfo.avatarUrl" :size="100"></n-avatar>
                        <div>
                            <div>{{ state.userInfo.name }}</div>
                        </div>
                    </n-space>
                </div>
                <n-empty v-else></n-empty>
            </n-spin>
        </n-card>
        <n-card>
            <n-tabs type="line" animated :default-value="route.params.tab" >
                <n-tab-pane name="myArticle" tab="我的文章">
                    <MyArticle />
                </n-tab-pane>
                <n-tab-pane name="myFavorite" tab="我的收藏">
                    Hey Jude
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { apis, request } from '@/utils';
import { onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import MyArticle from './components/MyArticle.vue'

const store = useStore()

const route = useRoute()

const userId = route.query.id

const state = reactive<{
    userInfo: any;
    getUserInfoLoading: boolean;
}>({
    userInfo: undefined,
    getUserInfoLoading: false
})

const getUserInfo = async () => {
    state.getUserInfoLoading = true;
    try {
        const userInfo = await request(apis.getUserInfo, {
            id: userId
        })
        if (userInfo) {
            state.userInfo = userInfo
        }
        state.getUserInfoLoading = false
    } catch (error) {
        state.getUserInfoLoading = false
    }
}


onMounted(() => {
    store.commit("setTitle")
    store.commit("setPath", [
        {
            title: '个人信息', url: '/profile',

        },
        { title: "用户#" + userId, url: route.fullPath, hide: !userId }
    ])
    getUserInfo()
})
</script>
<style lang="scss" scoped>
.profile {
    padding: 1rem;

    .userInfo {
        margin-bottom: 1rem;
    }
}
</style>