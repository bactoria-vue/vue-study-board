import {auth} from '../../../api'
import {SIGN_UP, SIGN_IN, SIGN_OUT, GET_USER, SET_USER} from '../../actions-types'
import {SET_BEFORE_URL, CLEAR_BEFORE_URL} from '../../mutations-types'
import {BEFORE_URL} from '../../getters-types'

const actions = {
    [SIGN_UP](_, account) {
        return auth.signUp(account)
    },
    [SIGN_IN](_, {email, pwd}) {
        return auth.login(email, pwd)
    },
    [SIGN_OUT]() {
        return auth.logout()
    },
    [GET_USER]() {
        return auth.getUser()
    },
    [SET_USER](_, user) {
        return auth.setUser(user)
    },
}

const mutations = {
    [SET_BEFORE_URL](state, payload) {
        state.beforeUrl = payload
    },
    [CLEAR_BEFORE_URL](state) {
        state.beforeUrl = ''
    },
    SET_AUTHENTICATED(state) {
        state.isAuthenticated = true
    },
    SET_NOT_AUTHENTICATED(state) {
        state.isAuthenticated = false
    }
}

const state = {
    beforeUrl: '',
    isAuthenticated: false
}

const getters = {
    [BEFORE_URL](state) {
        return state.beforeUrl
    },
    IS_AUTHENTICATED(state) {
        return state.isAuthenticated
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}