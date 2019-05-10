import {auth, board} from '../api'

const actions = {
    SIGN_UP(_, {email, pwd}) {
        const account = {}
        account.email=email;
        account.password=pwd;
        account.name="주노"
        account.phone="01044444444"

        return auth.singup(account);
    },
    SIGN_IN({commit}, {email, pwd}) {
        return auth.login(email, pwd)
            .then(data  => {
                commit('SIGN_IN', data.accessToken)
                commit('SET_REFRESH_TOKEN', data.refreshToken)
            })
    },
    SIGN_OUT() {
//        return firebase.auth().signOut()
    },

    SET_BOARDS({commit}) {
        board.fetch()
            .then(boards=> commit('SET_BOARDS', boards))
    },
    SET_BOARD({commit}, {id}) {
        board.fetch(id)
            .then(board => commit('SET_BOARD', board))
    },
    ADD_BOARD({commit}, {title, content}) {
        return board.create(title, content)
    },
    MODIFY_BOARD({commit}, {id, title, content}) {
        board.update(id, title, content)
            .then(board => commit('SET_BOARD', board))
    },
    DELETE_BOARD({commit}, {id}) {
        board.destroy(id)
    }
}

export default actions
