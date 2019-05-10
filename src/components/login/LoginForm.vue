<template>
    <v-layout row justify-center>
        <v-form ref="form" lazy-validation style="position: relative; top: 200px;">
            <v-text-field
                    v-model="email"
                    label="Id"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="pwd"
                    :type="'password'"
                    label="password"
                    @keyup.enter="signIn"
                    required
            ></v-text-field>

            <v-btn color="primary" @click="signIn">로그인</v-btn>
            <v-btn color="error" @click="signUp">회원가입</v-btn>
        </v-form>
    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex'

    export default {
        name: "LoginForm",
        data() {
            return {
                email: '',
                pwd: ''
            }
        },
        computed: {
            ...mapState(['beforeUrl'])
        },
        methods: {
            ...mapMutations(['SHOW_SIGN_UP_MODAL', 'SET_USER', 'SET_IS_AUTHENTICATED', 'CLEAR_BEFORE_URL']),
            ...mapActions(['SIGN_IN', 'GET_USER']),
            signUp() {
                this.SHOW_SIGN_UP_MODAL()
            },
            signIn() {
                const email = this.email;
                const pwd = this.pwd;
                this.SIGN_IN({email, pwd})
                    .then(_ => {
                        this.$router.replace(decodeURIComponent(this.beforeUrl) || '/')
                        this.CLEAR_BEFORE_URL()
                    })
                    .then(user => {
                        console.log(user.uid)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
