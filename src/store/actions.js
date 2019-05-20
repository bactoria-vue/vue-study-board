import {auth, board} from '../api'

const actions = {
    SIGN_UP(_, account) {
        return auth.signUp(account)
    },
    SIGN_IN(_, {email, pwd}) {
        return auth.login(email, pwd)
    },
    SIGN_OUT() {
        return auth.logout()
    },
    GET_USER() {
        return auth.getUser()
    },
    SET_USER(_, user) {
        return auth.setUser(user)
    },
    GET_BOARDS({commit}, lastDoc) {
        return board.fetchs(lastDoc)
            .then(docs => {
                var datas = [];
                docs.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    datas.push(data)
                });
                commit('SET_LAST_DOC', docs.lastDoc);
                commit('SET_BOARDS', datas);
                return docs
            })
    },
    GET_BOARD({commit}, {id}) {
        return board.fetch(id)
            .then(doc => {
                const data = doc.data()
                data.id = id
                return commit('SET_BOARD', data)
            })
    },
    ADD_BOARD({commit}, boardInfo) {
        return board.create(boardInfo)
            .then(_ => {
                commit('ADD_BOARD', boardInfo)
            })
    },
    MODIFY_BOARD(_, boardInfo) {
        return board.update(boardInfo)
    },
    DELETE_BOARD({commit}, {id}) {
        return board.destroy(id)
            .then(_ => {
                commit('CLEAR_BOARD')
            })
    }
}

export default actions
