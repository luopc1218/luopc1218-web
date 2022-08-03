<template>

    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <n-space vertical class="leaveMessage"
                :class="{ 'leaveMessage-visibility': slotProps.visibility, 'leaveMessage-halfVisibility': slotProps.halfVisibility, 'leaveMessage-crossed': slotProps.crossed }">
                <div class="title">
                    留言
                </div>
                <div class="inputer">
                    <n-form>
                        <n-form-item>
                            <n-input v-model:value="state.inputingLeaveMessage" type="textarea"
                                :autosize="{ minRows: 3 }">
                            </n-input>
                        </n-form-item>
                        <div style="text-align:center">
                            <n-button type="primary" round size="large" @click="handleSendLeaveMessage"
                                :loading="state.sendLeaveMessageLoading">
                                发送留言
                            </n-button>
                        </div>
                    </n-form>
                </div>
                <n-divider></n-divider>
                <n-spin :show="state.getLeaveMessageListLoading">
                    <n-empty v-if="state.leaveMessageList.totalCount <= 0"></n-empty>
                    <n-space vertical v-else class="leaveMessageList" align="center" :item-style="{ width: '100%' }">
                        <n-card v-for="item, index in state.leaveMessageList.list" :key="item.id"
                            class="leaveMessageItem" :style="{ animationDelay: `${index / 5}s` }">
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
                        <div style="textAlign:center;padding:1rem">
                            <router-link to="/leaveMessage" v-if="state.leaveMessageList?.totalCount > 10">
                                查看更多({{ state.leaveMessageList?.totalCount - state.leaveMessageList.list.length }})
                            </router-link>
                        </div>
                    </n-space>
                </n-spin>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store';
import request from '@/utils/request';
import apis from '@/utils/apis';
import { formatTime } from '@/utils/index'

const store = useStore()

const state = reactive<{
    inputingLeaveMessage: string;
    sendLeaveMessageLoading: boolean;
    getLeaveMessageListLoading: boolean;
    leaveMessageList: {
        list: any[],
        totalCount: number
    };
}>({
    inputingLeaveMessage: "",
    sendLeaveMessageLoading: false,
    getLeaveMessageListLoading: false,
    leaveMessageList: {
        list: [],
        totalCount: 0
    }
})

const getLeaveMessageList = async () => {
    state.getLeaveMessageListLoading = true;
    try {
        const leaveMessage = await request(apis.getLeaveMessageList, {
            page: 1,
            pageSize: 10
        })
        if (leaveMessage?.list) {
            state.leaveMessageList = leaveMessage
        }
        state.getLeaveMessageListLoading = false;
    } catch (error) {
        state.getLeaveMessageListLoading = false;
    }

}

const handleSendLeaveMessage = async () => {
    const doSend = async () => {
        state.sendLeaveMessageLoading = true;
        try {
            await request(apis.addLeaveMessage, {
                content: state.inputingLeaveMessage
            })
            state.inputingLeaveMessage = "";
            state.sendLeaveMessageLoading = false;
            getLeaveMessageList()

        } catch (error) {
            state.sendLeaveMessageLoading = false;
        }
    }
    if (!state.inputingLeaveMessage) {
        return window?._message.error("留言不能为空");
    }
    if (!store.state.user.userInfo) {
        window._dialog.warning({
            title: '警告',
            content: '是否匿名发送',
            positiveText: '匿名发送',
            negativeText: '不发送',
            onPositiveClick: () => {
                doSend()
            },

        })
    } else {
        doSend()
    }

}

onMounted(() => {
    getLeaveMessageList()
})


</script>

<style lang="scss" scoped>
@keyframes flyIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.leaveMessage {
    opacity: 0;
    transition: all 1s ease;
    transform: translateY(100px);
    padding: 0 500px;

    .title {
        text-align: center;
        padding: 1rem;
        font-size: 36px;
        transition: all 1s ease;
    }

    .inputer {
        // width: 40vw;
    }

    &-visibility {
        opacity: 1;
        transform: none
    }

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