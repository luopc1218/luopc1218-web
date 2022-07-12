import { createStore } from 'vuex'

export interface globalStoreStates {
  theme: {
    darkMode: boolean;
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
  }
}

export default createStore<globalStoreStates>({
  state: {
    theme: {
      darkMode: false,
      backgroundColor: "#fff",
      textColor: "#000",
      primaryColor: "#323232"
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
