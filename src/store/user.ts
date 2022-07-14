import User from '@/types/user'
import { apis, request } from '@/utils'
import { Module } from 'vuex'
import { globalStoreStates } from '.'

export interface userModuleState {
    userInfo: User | undefined
}

export const userModule: Module<userModuleState, globalStoreStates> = {
    state: {
        userInfo: undefined
    },
    getters: {
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {
        async getUserInfo(context) {
            try {
                const userInfo = await request(apis.getUserInfo)
                context.commit("setUserInfo", userInfo)
            }
            catch (e) {
                console.log(e);

            }
        }
    },
    modules: {
    }
}

export default userModule