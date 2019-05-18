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
        const userInfo = {
            username: "이름"
        }

        return firebase.auth().createUserWithEmailAndPassword(email, pwd)
//            .then(user => firebase.firestore().collection('users').doc(user.user.uid).set(userInfo))
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
                resolve(user);
            });
        });
    }
}

const boardLimit = 10;

export const board = {
    fetch(id) {
        if (id) {
            return firebase.firestore().collection('boards').doc(id).get()
        }
    },
    fetchs(page) {

        if (page === 'first') {
            return firebase.firestore().collection('boards')
                .orderBy("date", "desc")
                .limit(boardLimit)
                .get()
                .then(docs => {
                    docs.page = docs.docs[docs.docs.length - 1]
                    return docs
                })
        }

        return firebase.firestore().collection('boards')
            .orderBy("date", "desc")
            .startAfter(page)
            .limit(boardLimit)
            .get()
            .then(docs => {
                docs.page = docs.docs[docs.docs.length - 1]
                return docs
            })
    },
    create(title, content) {
        const user = firebase.auth().currentUser
        return firebase.firestore().collection('boards').add({
            title: title,
            content: content,
            uid: user.uid,
            date: new Date()
        })
    }
    ,
    update(modBoard) {
        const id = modBoard.id
        const title = modBoard.title
        const content = modBoard.content

        return firebase.firestore().collection('boards').doc(id).update({
            title: title,
            content: content
        })
    }
    ,
    destroy(id) {
        return firebase.firestore().collection('boards').doc(id).delete()
    }
}
