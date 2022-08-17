<template>
    <div class="header supportDark" ref="headerRef">
        <router-link to="/" class="title">
            {{ store.state.title }}
        </router-link>
        <div class="menu">
            <n-menu mode="horizontal" :options="menuOptions" />
        </div>
        <n-space align="center">
            <div class="searchInput">
                <n-input placeholder="请输入搜索内容" />
            </div>
            <n-popover style="padding: 0" trigger="click" :keep-alive-on-hover="false">
                <template #trigger>
                    <n-button>更换主题</n-button>
                </template>
                <color-picker isWidget disableAlpha :pure-color="store.state.theme.primaryColor"
                    @update:pure-color="handleChangePrimaryColor">
                    选择主题</color-picker>
            </n-popover>

            <n-button class="toggleDarkModeBtn" @click="toggleDarkMode">{{
                    store.state.theme.darkMode ? "浅色" : "暗色"
            }}
            </n-button>
            <n-spin v-if="store.state.user.userInfoLoading" :size="14" stroke="#fff"></n-spin>
            <n-space v-else-if="!!userInfo" align="center" :size="30">
                <MessageCenter>
                    <n-button text>
                        <i class="icon-messagecenter-fill messageCenterBtn"></i>
                    </n-button>
                </MessageCenter>
                <n-dropdown trigger="click" :options="moreOptions" @select="handleMoreOptionSelect">
                    <n-avatar round class="avatar" :src="userInfo.avatarUrl" />
                </n-dropdown>
            </n-space>
            <div v-else>
                <n-button text @click="handleSignIn">请先登录</n-button>
            </div>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { computed, h, onMounted, reactive, ref } from "vue";
import { RouterLink, useRouter } from 'vue-router'
import { NButton, NAvatar, NText, } from 'naive-ui'
import { useStore } from '@/store'
// color picker
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import MessageCenter from '@/components/MessageCenter.vue'

interface HeaderStates {
    navList: any[],
    showMessageCenter: boolean
}

const headerRef = ref<any>(null);

const router = useRouter()

const store = useStore();

const userInfo = computed(() => store.state.user.userInfo);

const state = reactive<HeaderStates>({
    navList: [
        { label: '博客', url: '/blog' },
        {
            label: '论坛', url: '/bbs'
        }
    ],
    showMessageCenter: false
})

/**
 * 监听切换浅色/暗色
 */
const toggleDarkMode = () => {
    store.commit("setDarkMode", !store.state.theme.darkMode)
}
/**
 * 导航列表
 */
const menuOptions = computed(() => state.navList.map(item => {
    return {
        label: () => h(RouterLink, {
            to: item.url,
            style: {
                // color: "#fff"
            }
        }, () => item.label),
        key: 'blogs',
    }
}))

/**
 * header菜单项
 */
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
                        src: userInfo.value?.avatarUrl
                    }),
                    h('div', null, [
                        h('div', null, [h(NText, { depth: 2 }, { default: () => userInfo.value?.name })]),
                        h('div', { style: 'font-size: 12px;' }, [
                            h(
                                NText,
                                { depth: 3 },
                                { default: () => '欢迎使用' }
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

/**
 * 监听选择header菜单项
 * @param key 
 */
const handleMoreOptionSelect = (key: string) => {
    switch (key) {
        case 'signOut':
            window?._dialog.warning({
                title: "提示",
                content: "确定要退出当前账号吗？",
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                    store.dispatch('user/signOut')
                },
            })
            break;
        case "userInfo": {
            router.push({ path: '/profile' })
            break;
        }
    }
}

/**
 * 监听切换主题色
 * @param color 颜色
 */
const handleChangePrimaryColor = (color: string) => {
    store.commit("setPrimaryColor", color)
}

/**
 * 监听登录
 */
const handleSignIn = () => {
    store.dispatch("user/signIn")
}


onMounted(() => {
    store.commit('setHeaderHeight', headerRef?.value?.clientHeight)

})

</script>

<style lang="scss">
.header {
    // color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    // background-color: var(--primary-color);

    .title {
        color: var(--base-colo);
        text-decoration: none;
        font-size: 25px;
        margin-right: 1rem;
        font-weight: bolder;
    }

    .menu {
        flex: 1;

    }

    .searchInput {
        margin-right: 1rem;

    }

    .toggleDarkModeBtn {
        margin-right: 1rem
    }

    .messageCenterBtn {
        font-size: 30px;
    }

    .avatar {
        cursor: pointer;
    }
}
</style>