<template>

    <ScrollAnimation>
        <template v-slot:default="slotProps">
            <n-space vertical class="message" align="center"
                :class="{ 'message-visibility': slotProps.visibility, 'message-halfVisibility': slotProps.halfVisibility, 'message-crossed': slotProps.crossed }">
                <div class="title">
                    留言
                </div>
                <div class="inputer">
                    <n-form>
                        <n-form-item>
                            <n-input v-model:value="state.inputingMessage" type="textarea" :autosize="{ minRows: 3 }">
                            </n-input>
                        </n-form-item>
                        <div style="text-align:center">
                            <n-button type="primary" round size="large" @click="handleSendMessage">
                                发送留言
                            </n-button>
                        </div>
                    </n-form>
                </div>
                <div class="messageList"></div>
            </n-space>
        </template>
    </ScrollAnimation>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrollAnimation from '@/components/ScrollAnimation.vue'
import { useStore } from '@/store';

const store = useStore()

const state = reactive({
    inputingMessage: "",
    sendMessageLoading: false
})

const handleSendMessage = async () => {
    state.sendMessageLoading = true;
    try {
    } catch (error) {
        state.sendMessageLoading = false;
    }

}


</script>

<style lang="scss" scoped>
.message {
    opacity: 0;
    transition: all 1s ease;
    transform: translateY(100px);

    .title {
        text-align: center;
        padding: 1rem;
        font-size: 36px;
        transition: all 1s ease;
    }

    .inputer {
        width: 40vw;
    }

    &-visibility {
        opacity: 1;
        transform: none
    }
}
</style>