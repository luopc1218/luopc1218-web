<template>
    <n-layout>
        <n-layout-header>
            <BlogHeader />
        </n-layout-header>
        <n-layout :has-sider="!route.meta.hideSider" content-style="padding:1rem">
            <n-layout-content>
                <n-card>
                    <router-view></router-view>
                </n-card>
            </n-layout-content>
            <n-layout-sider style="margin-left:1rem;" width="20%" v-if="!route.meta.hideSider">
                <n-card style="margin-bottom:1rem">
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
                    sider
                </n-card>

            </n-layout-sider>
        </n-layout>

    </n-layout>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BlogHeader from './components/BlogHeader.vue'

const route = useRoute()

onMounted(() => {
    console.log(route);

})
</script>
<style lang="scss" scoped>
</style>