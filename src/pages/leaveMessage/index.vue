<template>
    <div class="leaveMessagePage">
        <PaginationData :api="apis.getLeaveMessageList" :params="{ pageSize: 100 }">
            <template v-slot:default="{ data }">
                <n-space class="leaveMessageList">
                    <n-card v-for="item, index in data.list" :key="item.id" :style="{ animationDelay: `${index / 5}s` }"
                        class="leaveMessageItem">
                        <n-space align="center" class="author">
                            <n-avatar :src="item.authorAvatarUrl">

                            </n-avatar>
                            <div>
                                {{ item.authorName || "匿名" }}
                            </div>
                        </n-space>
                        <div class="time">
                            {{ formatTime(item.createTime) }}
                        </div>
                        {{ item.content }}
                    </n-card>
                </n-space>
            </template>
        </PaginationData>
    </div>
</template>
    
<script setup lang='ts'>
import PaginationData from '@/components/PaginationData.vue'
import { useStore } from '@/store';
import apis from '@/utils/apis'
import { onMounted } from 'vue';
import { formatTime } from '@/utils'

const store = useStore()

onMounted(() => {
    store.commit('setPath', [{ title: '首页', url: '/' }, { title: "全部留言", url: "/leaveMessage" }])
})
</script>
    
<style lang="scss" scoped>
@keyframes flyIn {
    from {
        opacity: 0;
        transform: translateY(100%);
    }

    to {
        opacity: 1;
        transform: 0;

    }
}

.leaveMessagePage {
    // padding: 1rem;

    .leaveMessageList {
        padding: 1rem;
        box-sizing: border-box;

        .leaveMessageItem {
            opacity: 0;
            animation: flyIn .3s ease;
            animation-fill-mode: forwards;

            .time {
                font-size: 12px;
                // color: #ccc;
                opacity: .6;
            }
        }
    }
}
</style>