import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import board from './module/board'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        board,
        auth
    }
})
