import {board} from '../../../api'
import {GET_BOARDS, GET_BOARD, ADD_BOARD, MODIFY_BOARD, DELETE_BOARD} from '../../actions-types'
import {SET_BOARDS, SET_BOARD, ADD_BOARD_IN_BOARDS, SET_LAST_DOC, CLEAR_LAST_DOC, CLEAR_BOARD, CLEAR_BOARDS} from '../../mutations-types'
import {BOARDS, BOARD, LAST_DOC, TITLE, CONTENT} from '../../getters-types'

const actions = {
    [GET_BOARDS]({commit}, lastDoc) {
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
    [GET_BOARD]({commit}, {id}) {
        return board.fetch(id)
            .then(doc => {
                const data = doc.data()
                data.id = id
                return commit(SET_BOARD, data)
            })
    },
    [ADD_BOARD]({commit}, boardInfo) {
        return board.create(boardInfo)
            .then(_ => {
                commit(ADD_BOARD_IN_BOARDS, boardInfo)
            })
    },
    [MODIFY_BOARD](_, boardInfo) {
        return board.update(boardInfo)
    },
    [DELETE_BOARD]({commit}, {id}) {
        return board.destroy(id)
            .then(_ => commit(CLEAR_BOARD))
    }
}

const mutations = {
    [SET_BOARDS](state, payload) {
        state.boards.push(...payload)
    },
    [SET_BOARD](state, payload) {
        state.board = payload
    },
    [ADD_BOARD_IN_BOARDS](state, payload) {
        state.boards.unshift(payload)
    },
    [SET_LAST_DOC](state, payload) {
        state.lastDoc = payload
    },
    [CLEAR_LAST_DOC](state) {
        state.lastDoc = null
    },
    [CLEAR_BOARD](state) {
        state.board = {}
    },
    [CLEAR_BOARDS](state) {
        state.boards = []
    },
}

const state = {
    boards: [],
    board: {},
    lastDoc: null,
}

const getters = {
    [BOARDS](state) {
        return state.boards
    },
    [BOARD](state) {
        return state.board
    },
    [LAST_DOC](state) {
        return state.lastDoc
    },
    [TITLE](state) {
        return state.board.title;
    },
    [CONTENT](state) {
        return state.board.content;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}