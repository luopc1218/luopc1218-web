<template>
    <div ref="footerRef" class="footer">
        <n-space vertical>
            powered by luopc1218
            <!-- <n-space class="dependencyList" align="center" justify="center">
                <n-tag size="small" type="primary">
                    @vue^3.x
                </n-tag>
                <n-tag size="small" type="primary">
                    @vue-cli^4.x
                </n-tag>
                <n-tag size="small" type="primary">
                    @naive-ui^2.x
                </n-tag>
            </n-space> -->
        </n-space>
    </div>

</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const footerRef = ref<any>(null)

const store = useStore()

onMounted(() => {
    store.commit('setFooterHeight', footerRef?.value?.offsetHeight)
})
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;
    font-size: 12px;
    color: #ccc;
    padding: 1rem;

    .dependency {}
}
</style>