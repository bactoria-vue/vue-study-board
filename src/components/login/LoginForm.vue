<template>
    <v-layout row justify-center>
        <v-form style="position: relative; top: 200px;">
            <v-text-field
                    v-validate="'required|email'"
                    v-model="email"
                    label="Id"
                    name="e-mail"
                    @keyup.enter="submit"
                    autofocus
                    :error-messages="errors.first('e-mail')"
            />

            <v-text-field
                    :type="'password'"
                    v-validate="'required|min:6|max:20'"
                    v-model="pwd"
                    name="password"
                    label="Password"
                    @keyup.enter="submit"
                    :error-messages="errors.first('password')"
            />

            <v-btn color="primary" @click="submit">로그인</v-btn>
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
            ...mapActions(['SIGN_IN']),
            signUp() {
                this.SHOW_SIGN_UP_MODAL()
            },
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        if (validated) {
                            const email = this.email;
                            const pwd = this.pwd;
                            this.SIGN_IN({email, pwd})
                                .then(_ => {
                                    this.$log.debug("로그인 성공")
                                    this.$router.replace(decodeURIComponent(this.beforeUrl) || '/')
                                    this.CLEAR_BEFORE_URL()
                                })
                                .catch(error => {
                                    alert(`로그인 실패. ${error.code}`)
                                })
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
