import firebase from "firebase";

const actions = {
    SIGN_UP(_, {email, pwd}) {
        return firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    SIGN_IN(_, {email, pwd}) {
        return firebase.auth().signInWithEmailAndPassword(email, pwd)
    },
    SIGN_OUT() {
        return firebase.auth().signOut()
    },
    SET_BOARDS({commit}) {
        firebase.firestore().collection('boards').orderBy("date", "desc").onSnapshot(function (querySnapshot) {
            var datas = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                datas.push(data)
            });
            commit('SET_BOARDS', datas);
        });
    },
    SET_BOARD({commit}, {id}) {
        return firebase.firestore().collection('boards').doc(id).get()
            .then(doc => {
                const data = doc.data()
                data.id = id
                commit('SET_BOARD', data)
            })
    },
    ADD_BOARD({commit}, {title, content}) {
        const user = firebase.auth().currentUser
        return firebase.firestore().collection('boards').add({
            title: title,
            content: content,
            uid: user.uid,
            date: new Date()
        })
    },
    MODIFY_BOARD(_, {id, title, content}) {
        return firebase.firestore().collection('boards').doc(id).update({
            title: title,
            content: content
        })
    },
    DELETE_BOARD({commit}, {id}) {
        firebase.firestore().collection('boards').doc(id).delete()
            .then(_ => {
                commit('CLEAR_BOARD')
            })
    }
}

export default actions
