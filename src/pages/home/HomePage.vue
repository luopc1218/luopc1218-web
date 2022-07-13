<template>
    <n-element class="home">
        <div class="logo">
            你所热爱的，
            <br />
            &nbsp;
            就是你的生活。
        </div>
        <div class="content">
            <n-grid x-gap="12" y-gap="12" :cols="4">
                <n-gi :span="4">
                    今日: 481|昨日: 574|帖子: 5034524|会员: 5448181 |欢迎新会员: AIYOUXXXs
                </n-gi>
                <n-gi :span="3">
                    <n-grid x-gap="12" y-gap="12" :cols="1">
                        <n-gi :span="1">
                            <n-card>
                                <div class="title" :span="3">收藏版面</div>
                            </n-card>
                        </n-gi>
                        <n-gi :span="1">
                            <n-card>
                                <div class="title" :span="3">热门版面</div>
                            </n-card>
                        </n-gi>
                    </n-grid>

                </n-gi>
                <n-gi :span="1">
                    <div class="announcement">
                        <n-card>
                            公告
                        </n-card>
                    </div>
                </n-gi>
            </n-grid>
        </div>

    </n-element>
</template>
<script lang="ts">
export default {
    name: "homePage",
    setup() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.home {
    .logo {
        background: url("../../assets/logo.jpg") no-repeat;
        height: 190px;
        color: var(--primary-color);
        font-size: 24px;
        font-family: fantasy;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        padding: 12px;

    }
}
</style>