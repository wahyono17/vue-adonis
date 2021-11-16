import createPersistedState from 'vuex-persistedstate'

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import landing from './landing'
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
    landing,
    products,
    projects,
  },
  plugins: [
    createPersistedState(),
  ],
})
