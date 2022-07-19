<template>
    <n-form ref="formRef" label-placement="left" :label-width="50" :model="formValue" class="signInForm"
        @submit="handleSubmit">
        <div class="title">
            登录Luopc1218
        </div>
        <n-form-item label="用户名" path="username">
            <n-input placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input placeholder="请输入密码" type="password" />
        </n-form-item>
        <n-form-item>
            <div style="width:100%;text-align:center;">
                <div style="display:flex;align-items: center;justify-content: flex-end;padding-bottom:1rem;">
                    <span>没有账号？</span>
                    <n-button text @click="handleSignUp">去注册</n-button>
                </div>
                <n-button type="primary" block attr-type="submit" @click="handleSubmit" round>登录</n-button>
                <n-divider></n-divider>
                <n-space>
                    <n-button>qq</n-button>
                    <n-button>weixin</n-button>
                    <n-button>weibo</n-button>
                </n-space>
            </div>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, FormInst } from 'naive-ui'

const formRef = ref<FormInst | null>(null)

const formValue = reactive({
    username: "",
    password: ""
})

const handleSignUp = () => {
    console.log('handleSignUp');

}

const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    console.log(formValue);

}

</script>

<style lang="scss" scoped>
.signInForm {
    .title {
        padding: 1rem;
        text-align: center;
        font-size: 25px;
        font-weight: bolder;
        font-family: 华文行楷;
    }
}
</style>