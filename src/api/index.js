import firebase from 'firebase'
import store from '../store'

firebase.initializeApp({
    apiKey: "AIzaSyDSuhX9SqwloDWezLak1aFSFUhiMk47CFw",
    authDomain: "board-762ba.firebaseapp.com",
    databaseURL: "https://board-762ba.firebaseio.com",
    projectId: "board-762ba",
    storageBucket: "board-762ba.appspot.com",
    messagingSenderId: "525568648776"
})

firebase.auth().onAuthStateChanged(function (user) {
    if (!!user) {
        store.commit('SET_AUTHENTICATED', true)
    }
})

export const auth = {
    signUp({email, pwd, username, phone}) {
        return firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then(_ => {
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: username
                })
                    .then(_ => {
                        firebase.firestore().collection('users').doc(user.uid).set({phone})        
                    })
            })
            .catch(error => alert(`회원가입 실패 ${error.message}`))
    },
    login(email, pwd) {
        return firebase.auth().signInWithEmailAndPassword(email, pwd)
    },
    logout() {
        return firebase.auth().signOut()
    },
    async isAuthenticated() {
        let isAuthenticated = false;
        await firebase.auth().onAuthStateChanged(function (user) {
            if (!!user) {
                isAuthenticated = true
            }
        })
        return isAuthenticated
    },
    async getUser() {
        const currentUser = await firebase.auth().currentUser;
        const user = {
            email: currentUser.email,
            name: currentUser.displayName,
            phone: ''
        }
        await firebase.firestore().collection('users').doc(currentUser.uid).get()
            .then(doc => {
                if(!!doc.data().phone) {
                    user.phone = doc.data().phone
                }
            })
        return user
    },
    async setUser({name, phone}) {
        const currentUser = await firebase.auth().currentUser
        currentUser.updateProfile({
            displayName: name
        })
        firebase.firestore().collection('users').doc(currentUser.uid).update({
            phone
        })
    }
}

const boardLimit = 10;

export const board = {
    fetch(id) {
        if (id) {
            return firebase.firestore().collection('boards').doc(id).get()
        }
    },
    fetchs(lastDoc) {
        if (lastDoc == null) {
            return firebase.firestore().collection('boards')
                .orderBy("createdDateTime", "desc")
                .limit(boardLimit)
                .get()
                .then(docs => {
                    docs.lastDoc = docs.docs[docs.docs.length - 1]
                    return docs
                })
        }

        return firebase.firestore().collection('boards')
            .orderBy("createdDateTime", "desc")
            .startAfter(lastDoc)
            .limit(boardLimit)
            .get()
            .then(docs => {
                docs.lastDoc = docs.docs[docs.docs.length - 1]
                return docs
            })
    },
    create(board) {
        const user = firebase.auth().currentUser
        board.username = user.displayName
        board.uid = user.uid
        board.createdDateTime = new Date()
        return firebase.firestore().collection('boards').add(board)
            .catch(error => {
                alert(error)
            })
            .then(doc => {
                board.id = doc.id
                return board
            })
    },
    update(boardInfo) {
        const id = boardInfo.id
        const title = boardInfo.title
        const content = boardInfo.content

        return firebase.firestore().collection('boards').doc(id).update({
            title: title,
            content: content
        })
            .catch(error => alert(error));
    },
    destroy(id) {
        return firebase.firestore().collection('boards').doc(id).delete()
    }
}
