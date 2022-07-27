<template>
    <n-form ref="formRef" label-placement="left" :label-width="50" :model="formValue" class="signInForm">
        <div class="title">
            登录{{ store.state.title }}
        </div>
        <n-form-item label="用户名" path="username">
            <n-input v-model:value="formValue.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" placeholder="请输入密码" type="password" />
        </n-form-item>
        <n-form-item>
            <div style="width:100%;text-align:center;">
                <n-space align="center" :size="2" justify="end" style="padding-bottom:1rem;">
                    <span>没有账号？</span>
                    <n-button text @click="handleSignUp">去注册</n-button>
                </n-space>
                <div style="padding:0 5rem">
                    <n-button type="primary" size="large" block attr-type="submit" @click="handleSubmit" round
                        :loading="state.submitLoading">登录
                    </n-button>
                </div>
                <n-divider></n-divider>
                <n-space align="center" size="large" justify="center">
                    <n-button circle size="large" @click="signInByQQ"><i class="icon-QQ extra"></i></n-button>
                    <n-button circle size="large" @click="signInByWeixin"><i class="icon-weixin extra"></i></n-button>
                    <n-button circle size="large" @click="signInByWeibo"><i class="icon-weibo extra"></i></n-button>
                </n-space>
            </div>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
import { FormInst } from 'naive-ui'
import { useStore } from '@/store'
import { apis, md5Object, request } from '@/utils';

interface SignInFormState {
    submitLoading: boolean
}

const emit = defineEmits(['finished'])

const store = useStore()

const formRef = ref<FormInst | null>(null)

const formValue = reactive({
    username: "",
    password: ""
})


const state = reactive<SignInFormState>({
    submitLoading: false
})

const handleSignUp = () => {
    store.dispatch('user/signUp')

}

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    state.submitLoading = true
    try {
        const accessToken = await request(apis.signIn, md5Object(formValue, ['password']), {
            showSuccessMessage: true
        })
        state.submitLoading = false
        localStorage.setItem('accessToken', accessToken)
        emit('finished')
    } catch (error) {
        state.submitLoading = false
    }
}

const signInByQQ = () => {
    window._message.info('开发中')
}
const signInByWeixin = () => {
    window._message.info('开发中')
}

const signInByWeibo = () => {
    window._message.info('开发中')
}


</script>

<style lang="scss" scoped>
.signInForm {
    .title {
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        font-family: 'Comic Sans MS', cursive;
    }

    .extra {
        font-size: 1.5rem;
    }
}
</style>