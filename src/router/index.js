import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import BoardList from '../views/BoardList.vue'
import Board from '../views/Board.vue'
import store from '../store'
import {auth} from '../api'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
    store.state.beforeUrl = encodeURIComponent(from.path)

    auth.isAuthenticated()
        .then(user => !!user.uid ? next() : next('/login'))
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: requireAuth()
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/board/',
            component: BoardList,
            beforeEnter: requireAuth()
        },
        {
            path: '/board/:id',
            component: Board,
            beforeEnter: requireAuth()
        }
    ]
})
