import { setAuthInHeader } from '../api'

const mutations = {
    SHOW_SIGN_UP_MODAL(state) {
        state.showSignUpModal = true;
    },
    CLOSE_SIGN_UP_MODAL(state) {
        state.showSignUpModal = false;
    },
    SHOW_ADD_BOARD_MODAL(state) {
        state.showAddBoardModal = true;
    },
    CLOSE_ADD_BOARD_MODAL(state) {
        state.showAddBoardModal = false;
    },
    SHOW_MODIFY_BOARD_MODAL(state) {
        state.showModifyBoardModal = true;
    },
    CLOSE_MODIFY_BOARD_MODAL(state) {
        state.showModifyBoardModal = false;
    },

    CLEAR_BEFORE_URL(state) {
        state.beforeUrl = ''
    },

    SET_BOARDS(state, payload) {
        state.boards = payload
    },
    SET_BOARD(state, payload) {
        state.board = payload
    },

    SIGN_IN(state, accessToken) {
        if (!accessToken) return
        state.accessToken = accessToken
        localStorage.accessToken = accessToken
        setAuthInHeader(accessToken)
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
        state.refreshToken = refreshToken
    }
}

export default mutations
