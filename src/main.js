import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import logger from './logger'
import validator from './validator'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    logger,
    validator,
    render: h => h(App)
}).$mount('#app')
