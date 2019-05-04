import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import logger from './logger'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyDSuhX9SqwloDWezLak1aFSFUhiMk47CFw",
    authDomain: "board-762ba.firebaseapp.com",
    databaseURL: "https://board-762ba.firebaseio.com",
    projectId: "board-762ba",
    storageBucket: "board-762ba.appspot.com",
    messagingSenderId: "525568648776"
};
firebase.initializeApp(config)

new Vue({
    router,
    store,
    logger,
    render: h => h(App)
}).$mount('#app')
