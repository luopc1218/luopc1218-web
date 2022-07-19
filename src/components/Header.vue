<template>
    <n-element class="header supportDark">
        <div class="title">
            Luopc1218's BBS
        </div>
        <div class="menu">
            <n-menu mode="horizontal" :options="menuOptions" />
        </div>
        <div class="searchInput">
            <n-input placeholder="请输入搜索内容" />
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
        <n-spin v-if="store.state.user.userInfoLoading" :size="14" stroke="#fff"></n-spin>
        <n-dropdown v-else-if="!!userInfo" trigger="click" :options="moreOptions" @select="handleMoreOptionSelect">
            <n-button text>
                <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </n-button>
        </n-dropdown>
        <div v-else>
            <n-button text color="#fff" @click="handleSignIn">请先登录</n-button>
        </div>
    </n-element>
</template>

<script lang="ts" setup>
import { computed, h, reactive, onMounted } from "vue";
import { NButton, NAvatar, NText, } from 'naive-ui'
import { useStore } from '@/store'
// color picker
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { apis, request } from "@/utils";
import type { SiteLink } from '@/types/system'

interface HeaderStates {
    navList: SiteLink[]
}

const store = useStore();

const userInfo = computed(() => store.state.user.userInfo);

const state = reactive<HeaderStates>({
    navList: []
})

/**
 * 监听切换浅色/暗色
 */
const toggleDarkMode = () => {
    store.commit("toggleDarkMode")
}
/**
 * 导航列表
 */
const menuOptions = computed(() => state.navList.map(item => {
    return {
        label: () => h("a", {
            href: item.url,
            style: {
                color: "#fff"
            }
        }, item.label),
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

/**
 * 监听选择header菜单项
 * @param key 
 */
const handleMoreOptionSelect = (key: string) => {
    console.log(key);

}

/**
 * 监听切换主题色
 * @param color 颜色
 */
const handleChangePrimaryColor = (color: string) => {
    store.commit("changePrimaryColor", color)
}

/**
 * 监听登录
 */
const handleSignIn = () => {
    store.dispatch("user/signIn")
}

const getNavLink = async () => {
    request<SiteLink[]>(apis.getNavLink).then(res => {
        if (res) {
            state.navList = res
        }
    });

}

onMounted(() => {
    getNavLink()
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
        flex: 1;

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