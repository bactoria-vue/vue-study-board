<template>
<div>
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
            <v-btn color="error" @click="openModal">회원가입</v-btn>
        </v-form>
    </v-layout>
    <sign-up-modal :show-sign-up-modal="showSignUpModal" @close-modal="closeModal" />
</div>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex'
    import SignUpModal from "./SignUpModal";
    import {BEFORE_URL} from "../../store/getters-types"

    export default {
        name: "LoginForm",
        data() {
            return {
                email: '',
                pwd: '',
                showSignUpModal: false
            }
        },
        components: {SignUpModal},
        computed: {
            ...mapGetters({    
            beforeUrl: BEFORE_URL
            })
        },
        methods: {
            ...mapMutations(['SET_USER', 'CLEAR_BEFORE_URL']),
            ...mapActions(['SIGN_IN']),
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
            },
            closeModal() {
                this.showSignUpModal = false
            },
            openModal() {
                this.showSignUpModal = true
            }
        }
    }
</script>

<style scoped>

</style>
