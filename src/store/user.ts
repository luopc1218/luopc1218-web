import User from '@/types/user'
import { apis, request } from '@/utils'
import { Module } from 'vuex'
import { globalStoreStates } from '.'
import SignInForm from '@/components/SignInForm.vue'
import { h } from 'vue'




export interface userModuleState {
    userInfo: User | undefined,
    userInfoLoading: boolean
}

export const userModule: Module<userModuleState, globalStoreStates> = {
    namespaced: true,
    state: {
        userInfoLoading: false,
        userInfo: undefined
    },
    getters: {
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload
        },
        setUserInfoLoading(state, payload) {
            state.userInfoLoading = payload
        }
    },
    actions: {
        async getUserInfo(context) {
            try {
                context.commit("setUserInfoLoading", true)
                const userInfo = await request(apis.getUserInfo)
                context.commit("setUserInfoLoading", false)
                context.commit("setUserInfo", userInfo)
            }
            catch (e) {
                context.commit("setUserInfoLoading", false)
            }
        },
        async checkSignIn(context) {
            try {
                const accessToken = await request(apis.checkSignIn, {}, { showErrorMessage: false })
                if (accessToken) {
                    context.dispatch("getUserInfo")
                }
            } catch (error) {
                console.log(error);
            }
        },
        async signIn(context) {
            try {
                const dialogInstance = window?._dialog.create({
                    showIcon: false,
                    content: () => h(SignInForm, {
                        onFinished() {
                            dialogInstance.destroy()
                            context.dispatch('checkSignIn')
                        }
                    }),
                })

            } catch (error) {
                console.log(error);
            }
        }
    },
    modules: {
    }
}

export default userModule