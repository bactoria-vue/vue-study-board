<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <router-link to="/">Home</router-link>
            <router-link to="/board">Board</router-link>
            <v-btn v-if="isAuthenticated" @click="logout">Logout</v-btn>
            <v-btn v-else @click="logout">Login</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "HeadToolbar",
        computed: {
            ...mapGetters({
                isAuthenticated: 'IS_AUTHENTICATED'
            })
        },
        methods: {
            ...mapActions(['SIGN_OUT']),
            ...mapMutations(['SET_NOT_AUTHENTICATED']),
            login() {
                this.$router.push('/login')
            },
            logout() {
                this.SIGN_OUT()
                    .then(_ => {
                        this.$router.push('/login')
                        this.SET_NOT_AUTHENTICATED()
                    })
            }
        }
    }
</script>

<style scoped>

</style>
