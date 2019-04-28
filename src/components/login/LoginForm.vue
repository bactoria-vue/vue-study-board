<template>
    <v-layout row justify-center>
        <v-form ref="form" v-model="valid" lazy-validation style="position: relative; top: 200px;">
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
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: "LoginForm",
        data() {
            return {
                valid: false,
                email: '',
                pwd: ''
            }
        },
        methods: {
            ...mapMutations(['SHOW_SIGN_UP_MODAL', 'SET_USER', 'SET_IS_AUTHENTICATED']),
            ...mapActions(['SIGN_IN']),
            signUp() {
                this.SHOW_SIGN_UP_MODAL()
            },
            signIn() {
                const email = this.email;
                const pwd = this.pwd;
                this.SIGN_IN({ email, pwd })
            }
        },


    }
</script>

<style scoped>

</style>
