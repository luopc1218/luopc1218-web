import { DEFAULT_PRIMARY_COLOR } from '@/utils/theme';
import { createStore, useStore as baseUserStore } from 'vuex'
import userModule, { userModuleState } from './user'

export interface Path {
  title: string,
  url: string,
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
  path: Path[]
}

export default createStore<globalStoreStates>({
  state: {
    theme: {
      darkMode: false,
      primaryColor: localStorage.getItem("primaryColor") || DEFAULT_PRIMARY_COLOR
    },
    title: '',
    path: []
  },
  getters: {
  },
  mutations: {
    toggleDarkMode(state) {
      state.theme.darkMode = !state.theme.darkMode
    },
    changePrimaryColor(state, color) {
      localStorage.setItem("primaryColor", color)
      state.theme.primaryColor = color
    },
    setTitle(state, payload) {
      state.title = payload || "Luopc1218's"
    },
    setPath(state, payload) {
      state.path = payload
    },
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