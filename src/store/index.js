import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showSignUpModal: false,
        showAddBoardModal: false,
        showModifyBoardModal: false,

        beforeUrl: '',

        boards: [],
        board: '',
    },
    mutations: {
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
        CLEAR_BOARD(state) {
            state.board = ''
        },

    },
    actions: {
        SIGN_UP(_, {email, pwd}) {
            return firebase.auth().createUserWithEmailAndPassword(email, pwd)
                .then((user) => {
                    console.log(user)
//                    return firebase.firestore().collection("users").doc()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        SIGN_IN(_, {email, pwd}) {
            return firebase.auth().signInWithEmailAndPassword(email, pwd)
        },
        GET_USER() {
            return firebase.auth().currentUser;
        },
        SIGN_OUT() {
            return firebase.auth().signOut()
        },
        GET_BOARDS({commit}) {
            firebase.firestore().collection('boards').orderBy("date", "desc").onSnapshot(function (querySnapshot) {
                var datas = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    datas.push(data)
                });
                commit('SET_BOARDS', datas);
            });
        }
        ,
        GET_BOARD({commit}, {id}) {
            firebase.firestore().collection('boards').doc(id).get()
                .then(doc => {
                    const data = doc.data()
                    data.id = id
                    commit('SET_BOARD', data)
                })
        },
        SET_BOARD({commit}, {title, content}) {
            const user = firebase.auth().currentUser
            return firebase.firestore().collection('boards').add({
                title: title,
                content: content,
                uid: user.uid,
                date: new Date()
            })
        }
        ,
        MODIFY_BOARD(_, {id, title, content}) {
            return firebase.firestore().collection('boards').doc(id).update({
                title: title,
                content: content
            })
        }
        ,
        DELETE_BOARD({commit}, {id}) {
            firebase.firestore().collection('boards').doc(id).delete()
                .then(_ => {
                    commit('CLEAR_BOARD')
                })
        }
    }
})
