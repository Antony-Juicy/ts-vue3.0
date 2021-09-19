import Vue from 'vue'
import App from './App.vue'

import ComPositonApi from '@vue/composition-api'
Vue.use(ComPositonApi)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')