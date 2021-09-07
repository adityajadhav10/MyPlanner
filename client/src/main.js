// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

//Font awesome 
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'

Vue.use(Vuetify)
Vue.use(VeeValidate);

sync(store, router)

Vue.component('icon', Icon)

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.config.productionTip = false

/* eslint-disable */ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
