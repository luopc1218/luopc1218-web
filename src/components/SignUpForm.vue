<template>
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formValue" class="signInForm"
        :rules="formRules">
        <div class="title">
            注册{{ store.state.title }}
        </div>
        <n-form-item label="头像" path="avatar">
            <n-space align="end">
                <n-avatar round :size="100" :src="formValue.avatar"></n-avatar>
                <n-button size="small" ghost type="primary" @click="getRandomAvatar">换一个</n-button>
                <SingleUpload accept="image/*" v-model:value="formValue.avatar">
                    <n-button size="small" ghost type="primary">上传新头像</n-button>
                </SingleUpload>
            </n-space>
        </n-form-item>
        <n-form-item label="用户名" path="username">
            <n-input v-model:value="formValue.username" placeholder="请输入用户名" :loading="state.usernameCheckLoading" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" placeholder="请输入密码" type="password" />
        </n-form-item>
        <n-form-item label="确认密码" path="checkPassword">
            <n-input v-model:value="formValue.checkPassword" placeholder="请再次输入密码" type="password" />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
            <n-input-group>
                <RemoteSelect :api="apis.getCountryTelCodeList" label-key="tel" value-key="id"
                    v-model:value="formValue.telCodeId" :labelFormat="countryTelCodeLabelFormat" filterable
                    style="width:100px" />
                <div style="padding:0 1rem;display: flex;align-items: center;">-</div>
                <n-input v-model:value="formValue.phone" placeholder="请输入手机号" style="flex:1" />
                <n-button :disabled="!formValue.phone || state.sendPhoneCheckCodeWaitTime > 0"
                    @click="handleSendPhoneCheckCode" :loading="state.sendPhoneCheckCodeLoading">{{
                            state.sendPhoneCheckCodeWaitTime
                                > 0 ? `${state.sendPhoneCheckCodeWaitTime}s` : '获取验证码'
                    }}</n-button>
            </n-input-group>
        </n-form-item>
        <n-form-item label="验证码" path="phoneCheckCode" v-if="state.sentPhoneCheckCode">
            <n-input v-model:value="formValue.phoneCheckCode" placeholder="请输入验证码">
            </n-input>
        </n-form-item>
        <n-form-item label="邮箱" path="email">
            <n-input placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item>
            <div style="width:100%;text-align:center;padding:3rem 5rem 0 5rem">
                <n-button type="primary" size="large" block attr-type="submit" @click="handleSubmit" round
                    :loading="state.submitLoading">注册
                </n-button>
            </div>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, reactive, ref, computed } from 'vue'
import { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { useStore } from '@/store'
import SingleUpload from '@/components/SingleUpload.vue'
import axios from 'axios';
import RemoteSelect from '@/components/RemoteSelect.vue'
import apis from '@/utils/apis'
import { md5Object, request } from '@/utils';





const emit = defineEmits(['finished'])

const getRandomAvatar = () => {
    axios.get('http://api.btstu.cn/sjtx/api.php', {
        params: {
            format: 'json'
        }
    }).then(res => {
        formValue.avatar = res.data.imgurl
    })
}

const store = useStore()

const formRef = ref<FormInst | undefined>(undefined)

const formValue = reactive({
    avatar: "",
    username: "",
    password: "",
    checkPassword: "",
    telCodeId: 1,
    phone: "",
    phoneCheckCode: "",
    email: ""
})

const state = reactive({
    usernameCheckLoading: false,
    sentPhoneCheckCode: false,
    sendPhoneCheckCodeLoading: false,
    sendPhoneCheckCodeWaitTime: 0,
    submitLoading: false
})

const checkUsername = async (rule: FormItemRule, value: string) => {
    if (value === "") {
        return Promise.resolve();
    }
    try {
        state.usernameCheckLoading = true;
        await request(apis.checkSignUpUsername, { username: formValue.username }, {
            showErrorMessage: false
        })
        state.usernameCheckLoading = false
        return Promise.resolve();
    } catch (error) {
        state.usernameCheckLoading = false
        return Promise.reject(error);
    }
}

const formRules = computed<FormRules>(() => ({
    avatar: { required: true, message: '请选择头像', },
    username: [{ required: true, message: '请输入用户名', trigger: ['input'] }, {
        asyncValidator: checkUsername, trigger: [],
    }],
    password: { required: true, message: '请输入密码', },
    checkPassword: [{ required: true, message: '请再次输入密码', }, {
        validator: (rule: FormItemRule, value: string) => {
            return value === "" || value === formValue.password
        }, message: '两次密码输入不一致',
    }],
    phoneCheckCode: { required: formValue.phone <= "", message: "请输入手机验证码" }
}))



// 获取手机验证码
const handleSendPhoneCheckCode = async () => {
    try {
        state.sendPhoneCheckCodeLoading = true;
        await request(apis.sendPhoneCheckCode, { telCodeId: formValue.telCodeId, phone: formValue.phone })
        state.sendPhoneCheckCodeLoading = false;
        state.sentPhoneCheckCode = true;
        state.sendPhoneCheckCodeWaitTime = 60;
        const sendPhoneCheckCodeWaitTimeInterval = setInterval(() => {
            state.sendPhoneCheckCodeWaitTime -= 1
            if (state.sendPhoneCheckCodeWaitTime <= 0) {
                clearInterval(sendPhoneCheckCodeWaitTimeInterval)
            }
        }, 1000)
    } catch (error) {
        state.sendPhoneCheckCodeLoading = false;
    }
}


// 格式化电话区号下拉选项
const countryTelCodeLabelFormat = (label: string) => {
    return `+${label}`
}

/**
 * 监听提交表单
 */
const handleSubmit = (e: Event) => {
    e.preventDefault();
    formRef.value?.validate(async error => {
        if (!error) {
            state.submitLoading = true;
            try {
                const response = await request(apis.signUp, md5Object(formValue, ['password', 'checkPassword']), {
                    showSuccessMessage: true
                })
                state.submitLoading = false
                emit("finished", response);
            } catch (error) {
                state.submitLoading = false
            }
        }
    })
}

onMounted(() => {
    getRandomAvatar()
})

</script>

<style lang="scss" scoped>
.signInForm {
    .title {
        padding:3rem 1rem;
        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        ;
    }

    .extra {
        font-size: 1.5rem;
    }
}
</style>