<template>
    <div ref="footerRef">
        <n-space vertical class="footer">
            powered by luopc1218
            <n-space class="dependencyList" align="center" justify="center">
                <n-tag size="small" type="primary">
                    @vue^3.x
                </n-tag>
                <n-tag size="small" type="primary">
                    @vue-cli^4.x
                </n-tag>
                <n-tag size="small" type="primary">
                    @naive-ui^2.x
                </n-tag>
            </n-space>
        </n-space>
    </div>

</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const footerRef = ref<any>(null)

const store = useStore()

onMounted(() => {
    console.log(footerRef);

    store.commit('setFooterHeight', footerRef?.value?.clientHeight)
})
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;
    padding: 2rem;
    font-size: 12px;
    color: #ccc;

    .dependency {}
}
</style>