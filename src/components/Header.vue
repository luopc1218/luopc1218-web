<template>
    <div class="header">
        <div class="title">
            Luopc1218's BBS
        </div>
        <n-menu />
        <n-button @click="changeDarkMode">{{ store.state.theme.darkMode ? "日间" : "夜间" }}</n-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NMenu, NButton } from 'naive-ui'
import { useStore } from 'vuex'
import { globalStoreStates } from "@/store";

export default defineComponent({
    components: { NMenu, NButton },
    setup() {
        const store = useStore<globalStoreStates>()
        const changeDarkMode = () => {
            console.log(store.state.theme);
        }
        return {
            store, changeDarkMode
        }
    }
})
</script>

<style lang="scss">
.header {
    padding: 1rem;
    display: flex;
    align-content: flex-end;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;

    .title {
        font-size: 20px;
    }
}
</style>