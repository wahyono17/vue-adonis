import createPersistedState from 'vuex-persistedstate'

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import products from './products'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
    // baseUrl: 'http://localhost:3333/api',
  },
  getters:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    products,
    projects,
  },
  plugins: [
    createPersistedState(),
  ],
})
