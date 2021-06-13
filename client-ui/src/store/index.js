import createPersistedState from 'vuex-persistedstate'

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: 'http://localhost:3333/api',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
  },
  plugins: [
    createPersistedState(),
  ],
})
