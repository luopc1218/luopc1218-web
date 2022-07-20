<template>
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="state.formValue" class="signInForm"
        @submit="handleSubmit">
        <div class="title">
            注册Luopc1218
        </div>
        <n-form-item label="头像" path="avatar">
            <n-space align="end">
                <n-avatar round :size="100" :src="state.formValue.avatar"></n-avatar>
                <n-button size="small" ghost type="primary" @click="getRandomAvatar">换一个</n-button>
                <SingleUpload accept="image/*" v-model:value="state.formValue.avatar">
                    <n-button size="small" ghost type="primary">上传新头像</n-button>
                </SingleUpload>
            </n-space>
        </n-form-item>
        <n-form-item label="用户名" path="username">
            <n-input placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input placeholder="请输入密码" type="password" />
        </n-form-item>
        <n-form-item label="确认密码" path="checkPassword">
            <n-input placeholder="请再次输入密码" type="password" />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
            <n-input-group>
                <n-select></n-select>
                <n-input placeholder="请输入手机号" />
            </n-input-group>
        </n-form-item>
        <n-form-item label="邮箱" path="email">
            <n-input placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item>
            <div style="width:100%;text-align:center;">
                <div style="padding:0 5rem">
                    <n-button type="primary" size="large" block attr-type="submit" @click="handleSubmit" round>注册
                    </n-button>
                </div>
            </div>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, FormInst } from 'naive-ui'
import { useStore } from 'vuex'
import SingleUpload from '@/components/SingleUpload.vue'
import axios from 'axios';

onMounted(() => {
    getRandomAvatar()
})

const getRandomAvatar = () => {
    axios.get('http://api.btstu.cn/sjtx/api.php', {
        params: {
            format: 'json'
        }
    }).then(res => {
        state.formValue.avatar = res.data.imgurl
    })
}

const store = useStore()

const formRef = ref<FormInst | null>(null)

const state = reactive({
    formValue: {
        avatar: "",
        username: "",
        password: "",
        checkPassword: "",
        phone: "",
        email: ""
    }
})


const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log(state.formValue);

}

</script>

<style lang="scss" scoped>
.signInForm {
    .title {
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        font-family: 华文行楷;
    }

    .extra {
        font-size: 1.5rem;
    }
}
</style>