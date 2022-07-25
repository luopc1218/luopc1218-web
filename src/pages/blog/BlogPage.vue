<template>
    <n-layout>
        <n-layout-header>
            <BlogHeader />
        </n-layout-header>
        <n-layout has-sider content-style="padding:1rem">
            <n-layout-content>
                <n-card>
                    content
                </n-card>
            </n-layout-content>
            <n-layout-sider style="margin-left:1rem;" width="20%" >
                <n-card style="margin-bottom:1rem">
                    <n-space>
                        <n-button type="primary">
                            写文章
                        </n-button>
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
<script lang="ts" setup>import { onMounted } from 'vue';
import { useStore } from '@/store';
import BlogHeader from './components/BlogHeader.vue'

const store = useStore()

onMounted(() => {
    store.commit('setTitle', 'Luopc1218\'s Blog');
    store.commit('setPath', [{ title: '博客', url: '/blog' }])
})

</script>
<style lang="scss" scoped>
.home {}
</style>