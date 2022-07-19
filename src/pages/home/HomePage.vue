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
                    <n-space class="statistics">
                        <div>今日: 0</div>
                        <div>昨日: 0</div>
                        <div>帖子: 0</div>
                        <div>会员: 0 </div>
                        <div>欢迎您: luopc1218</div>
                    </n-space>
                </n-gi>
                <n-gi :span="3">
                    <n-grid x-gap="12" y-gap="12" :cols="1">
                        <n-gi :span="1">
                            <n-card>
                                <div class="title">收藏版面</div>
                                <n-empty></n-empty>
                            </n-card>
                        </n-gi>
                        <n-gi :span="1">
                            <n-card>
                                <div class="title">热门版面</div>
                                <n-empty></n-empty>
                            </n-card>
                        </n-gi>
                    </n-grid>

                </n-gi>
                <n-gi :span="1">
                    <n-grid x-gap="12" y-gap="12" :cols="1">
                        <n-gi :span="1">
                            <div class="announcement">
                                <n-card>
                                    <n-space>
                                        <n-button type="primary" secondary strong>发帖</n-button>
                                    </n-space>
                                </n-card>
                            </div>
                        </n-gi>
                        <n-gi :span="1">
                            <div class="announcement">
                                <n-card>
                                    <div class="title">
                                        公告
                                    </div>
                                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perferendis optio
                                        reiciendis nemo enim officia fugiat totam voluptates non cupiditate consequatur
                                        hic atque perspiciatis, tempora suscipit autem assumenda ea ratione. Ipsam,
                                        magni. Nesciunt ratione, voluptatum, maxime illum incidunt, soluta animi itaque
                                        distinctio aperiam ullam numquam quam beatae pariatur dolor a aliquid quidem
                                        culpa totam architecto assumenda blanditiis aut magnam repellat. Cupiditate
                                        reprehenderit earum ipsa, asperiores consectetur placeat vel consequuntur
                                        voluptatum tempora maiores perspiciatis et a possimus qui nulla illum autem
                                        laudantium fugit, temporibus alias expedita. Vitae voluptates praesentium sed
                                        vero ratione ducimus delectus cumque est deleniti veritatis consectetur dolore
                                        fuga at inventore soluta, assumenda, possimus mollitia? Officiis, dignissimos
                                        doloribus amet ad ipsum ratione praesentium ut eaque voluptatibus unde voluptas
                                        at dolorum rem iste maxime possimus ipsa, atque a aliquam fugit et?
                                        Exercitationem, nam amet, earum rem, ratione esse accusamus quam voluptatum vero
                                        eum quo quos saepe provident sint aut impedit possimus velit! Facilis rerum,
                                        aspernatur consequatur debitis molestias delectus itaque assumenda nisi
                                        repellendus ducimus rem commodi a beatae voluptate quis eveniet pariatur animi
                                        consequuntur iure quo iusto? Iure fuga at provident tempore ea possimus nostrum
                                        cum molestias veritatis omnis quo neque dolor asperiores, vero nesciunt nihil
                                        natus cupiditate! Iusto, tempore.</div>
                                </n-card>
                            </div>
                        </n-gi>

                    </n-grid>

                </n-gi>
            </n-grid>
        </div>

    </n-element>
</template>
<script lang="ts" setup>

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

        .statistics {
            opacity: .5;
        }

    }
}
</style>