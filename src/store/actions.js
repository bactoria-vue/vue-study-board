import {auth, board} from '../api'

const actions = {
    SIGN_UP(_, {email, pwd}) {
        return auth.signUp(email, pwd)
            .catch(error => {
                alert(error.message)
                throw error
            })
    },
    SIGN_IN(_, {email, pwd}) {
        return auth.login(email, pwd)
    },
    SIGN_OUT() {
        return auth.logout()
    },
    GET_BOARDS({commit}, page) {
        return board.fetchs(page)
            .then(docs => {
                var datas = [];
                docs.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    datas.push(data)
                });
                commit('SET_PAGE', docs.page);
                commit('SET_BOARDS', datas);
                return docs
            })
    },
    GET_BOARD({commit}, {id}) {
        return board.fetch(id)
            .then(doc => {
                const data = doc.data()
                data.id = id
                commit('SET_BOARD', data)
            })
    },
    ADD_BOARD({commit}, {title, content}) {
        return board.create(title, content)
            .then(_ => {
                commit('CLEAR_BOARDS')
                commit('INIT_PAGE')
            })
    },
    MODIFY_BOARD(_, {id, title, content}) {
        return board.update(id, title, content)
    },
    DELETE_BOARD({commit}, {id}) {
        return board.destroy(id)
            .then(_ => {
                commit('CLEAR_BOARD')
            })
    }
}

export default actions
