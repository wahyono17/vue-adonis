import 'vuetify/dist/vuetify.min.css'

import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import App from './App.vue'
import Panel from './components/Panel.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false
sync(store, router)

Vue.component('Panel',Panel)
// console.log("pertama kali");

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
