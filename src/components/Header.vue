<template>
    <n-element class="header supportDark">
        <div class="title">
            Luopc1218's BBS
        </div>
        <div class="menu">
            <n-menu mode="horizontal" :options="menuOptions" />
        </div>
        <div class="searchInput">
            <n-input />
        </div>
        <n-popover style="padding: 0" trigger="click" :keep-alive-on-hover="false">
            <template #trigger>
                <n-button secondary ghost color="#fff">更换主题</n-button>
            </template>
            <color-picker isWidget disableAlpha :pure-color="store.state.theme.primaryColor"
                @update:pure-color="handleChangePrimaryColor">
                选择主题</color-picker>
        </n-popover>

        <n-button secondary ghost color="#fff" class="toggleDarkModeBtn" @click="toggleDarkMode">{{
                store.state.theme.darkMode ? "浅色" : "暗色"
        }}
        </n-button>
        <n-dropdown trigger="click" :options="moreOptions" @select="handleMoreOptionSelect">
            <n-button text>
                <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </n-button>
        </n-dropdown>


    </n-element>
</template>

<script lang="ts">
import { defineComponent, h, reactive } from "vue";
import { NButton, NAvatar, NText, } from 'naive-ui'
import { useStore } from 'vuex'
import { globalStoreStates } from "@/store";
// color picker
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

export default defineComponent({
    components: { ColorPicker },
    setup() {
        const store = useStore<globalStoreStates>()
        const toggleDarkMode = () => {
            store.commit("toggleDarkMode")
        }
        const menuOptions = reactive([{
            label: () => h(NButton, {
                text: true, color: "#fff", onClick() {
                    document.location = "http://106.52.172.134:8001"
                }
            }, '博客'),
            key: 'blogs',

        }, {
            label: () => h(NButton, {
                text: true, color: "#fff", onClick() {
                    document.location = "/"
                }
            }, '论坛'),
            key: 'bbs',

        }])

        const moreOptions = reactive([
            {
                key: 'userInfo',
                type: 'render',
                render() {
                    return h(
                        'div',
                        {
                            style: 'display: flex; align-items: center; padding: 8px 12px;'
                        },
                        [
                            h(NAvatar, {
                                round: true,
                                style: 'margin-right: 12px;',
                                src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG'
                            }),
                            h('div', null, [
                                h('div', null, [h(NText, { depth: 2 }, { default: () => '打工仔' })]),
                                h('div', { style: 'font-size: 12px;' }, [
                                    h(
                                        NText,
                                        { depth: 3 },
                                        { default: () => '毫无疑问，你是办公室里最亮的星' }
                                    )
                                ])
                            ])
                        ]
                    )
                },
            },
            {
                type: 'divider',
                key: 'd1'
            }, {
                label: '个人信息',
                key: 'userInfo',
            },
            {
                label: '系统管理',
                key: 'systemManagement',
            },
            {
                label: '注销',
                key: 'signOut',

            },])

        const handleMoreOptionSelect = (key: string) => {
            console.log(key);

        }

        const handleChangePrimaryColor = (color: string) => {
            store.commit("changePrimaryColor", color)
        }
        return {
            store, toggleDarkMode, menuOptions, moreOptions, handleMoreOptionSelect, handleChangePrimaryColor
        }
    }
})
</script>

<style lang="scss">
.header {
    color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;

    background-color: var(--primary-color);

    .title {
        font-size: 20px;
        margin-right: 1rem;
        font-family: fantasy;
    }

    .menu {
        flex: 1
    }

    .searchInput {
        margin-right: 1rem;

    }

    .toggleDarkModeBtn {
        margin-right: 1rem
    }

    .userInfo {
        margin-right: 1rem;
    }
}
</style>