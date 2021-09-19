import Vue from 'vue'
import App from './App.vue'

import ComPositionApi from '@vue/composition-api'
Vue.use(ComPositionApi);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
