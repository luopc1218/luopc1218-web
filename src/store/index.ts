import { DEFAULT_PRIMARY_COLOR } from '@/utils/theme';
import { createStore, useStore as baseUserStore } from 'vuex'
import userModule, { userModuleState } from './user'

export interface Path {
  title: string,
  url: string,
  hide?: boolean
}

export interface AllStoreStates extends globalStoreStates {
  user: userModuleState
}
export interface globalStoreStates {
  theme: {
    darkMode: boolean;
    primaryColor: string;
  },
  title: string,
  path: Path[],
  headerHeight: number,
  footerHeight: number

}

export default createStore<globalStoreStates>({
  state: {
    theme: {
      darkMode: !!localStorage.getItem("darkMode"),
      primaryColor: localStorage.getItem("primaryColor") || DEFAULT_PRIMARY_COLOR
    },
    title: '',
    path: [],
    headerHeight: 0,
    footerHeight: 0
  },
  getters: {
  },
  mutations: {
    setDarkMode(state, payload) {
      if (!payload) {
        localStorage.removeItem("darkMode")
      } else {
        localStorage.setItem("darkMode", payload)
      }
      state.theme.darkMode = payload
    },
    setPrimaryColor(state, payload) {
      localStorage.setItem("primaryColor", payload)
      state.theme.primaryColor = payload
    },
    setTitle(state, payload) {
      state.title = payload || "Luopc1218"
    },
    setPath(state, payload) {
      state.path = payload
    },
    setHeaderHeight(state, payload) {
      state.headerHeight = payload
    },
    setFooterHeight(state, payload) {
      state.footerHeight = payload
    }
  },
  actions: {

  },
  modules: {
    user: userModule
  }
})


export const useStore = () => {
  return baseUserStore<AllStoreStates>()
}