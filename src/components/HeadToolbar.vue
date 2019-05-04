<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <router-link to="/">Home</router-link>
            <router-link to="/board">Board</router-link>
            <v-btn @click="login" v-if="isAuthenticated">Login</v-btn>
            <v-btn @click="logout" v-else>Logout</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    import {mapActions} from 'vuex'
    import firebase from 'firebase'

    export default {
        name: "HeadToolbar",
        data() {
            return {
                isAuthenticated: false
            }
        },
        mounted() {
            this.$log.debug(firebase.auth().currentUser)
        },
        updated() {
            this.isAuthenticated = !!firebase.auth().currentUser
        },
        methods: {
            ...mapActions(['SIGN_OUT']),
            login() {
                this.$router.push('/login')
            },
            logout() {
                this.SIGN_OUT()
                    .then(_ => {
                        this.$router.push('/login')
                    })
            }
        }

    }
</script>

<style scoped>

</style>
