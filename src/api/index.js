import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDSuhX9SqwloDWezLak1aFSFUhiMk47CFw",
    authDomain: "board-762ba.firebaseapp.com",
    databaseURL: "https://board-762ba.firebaseio.com",
    projectId: "board-762ba",
    storageBucket: "board-762ba.appspot.com",
    messagingSenderId: "525568648776"
})

export const auth = {
    signUp(email, pwd) {
        return firebase.auth().createUserWithEmailAndPassword(email, pwd)
    },
    login(email, pwd) {
        return firebase.auth().signInWithEmailAndPassword(email, pwd)
    },
    logout() {
        return firebase.auth().signOut()
    },
    isAuthenticated() {
        return new Promise(function (resolve) {
            firebase.auth().onAuthStateChanged(function (user) {
                resolve(user.uid);
            });
        });
    }
}

export const board = {
    fetch(id) {
        if (id) {
            return firebase.firestore().collection('boards').doc(id).get()
        }
        return firebase.firestore().collection('boards').orderBy("date", "desc").get()
    },
    create(title, content) {
        const user = firebase.auth().currentUser
        return firebase.firestore().collection('boards').add({
            title: title,
            content: content,
            uid: user.uid,
            date: new Date()
        })
    },
    update(id, title, content) {
        return firebase.firestore().collection('boards').doc(id).update({
            title: title,
            content: content
        })
    },
    destroy(id) {
        return firebase.firestore().collection('boards').doc(id).delete()
    }
}
