<template>
    <div class="messageCenter">
        <n-badge :value="12" :max="99">
            <n-button text @click="handleOpenMessageCenter">
                <slot />
            </n-button>
        </n-badge>
        <n-drawer v-model:show="state.visible">
            <n-drawer-content title="消息中心">
                <n-empty></n-empty>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
interface MessageCenterState {
    visible: boolean
}

const state = reactive<MessageCenterState>({
    visible: false
})

const handleOpenMessageCenter = () => {
    state.visible = true
}

</script>

<style scoped>
</style>