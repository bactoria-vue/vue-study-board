<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <router-link to="/">Home</router-link>
            <router-link to="/board">Board</router-link>
            <v-btn @click="logout">Login</v-btn>
            <v-btn @click="logout">Logout</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "HeadToolbar",
        data() {
            return {
                isAuthenticated: false
            }
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
