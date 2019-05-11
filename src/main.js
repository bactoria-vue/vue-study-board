import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import logger from './logger'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    logger,
    render: h => h(App)
}).$mount('#app')
