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
    signUp({email, pwd, username, phone}) {
        return firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then(_ => {
                const user = firebase.auth().currentUser;
                return user.updateProfile({
                    displayName: username
                })
            })
            .then(user => firebase.firestore().collection('users').doc(user.uid).set({phone}))
            .catch(error => alert(`회원가입 실패 ${error.message}`))
    },
    login(email, pwd) {
        return firebase.auth().signInWithEmailAndPassword(email, pwd)
    },
    logout() {
        return firebase.auth().signOut()
    },
    async isAuthenticated() {
        await firebase.auth().onAuthStateChanged(function (user) {
            return !!user.uid
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
