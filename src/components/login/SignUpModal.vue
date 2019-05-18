<template>
    <v-dialog v-model="showSignUpModal" max-width="500px">
        <v-card>
            <v-card-title>
                회원가입
            </v-card-title>
            <v-form>
                <v-text-field
                        v-validate="'required|email'"
                        v-model="email"
                        label="email"
                        name="e-mail"
                        autofocus
                        :error-messages="errors.first('e-mail')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-text-field
                        :type="'password'"
                        v-validate="'required|min:6|max:20'"
                        v-model="pwd"
                        name="password"
                        label="Password"
                        :error-messages="errors.first('password')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-btn color="primary" flat @click="submit">등록</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex'

    export default {
        name: "SignUpModal",
        data() {
            return {
                email: '',
                name: '',
                pwd: ''
            }
        },
        computed: {
            ...mapState(['showSignUpModal'])
        },
        methods: {
            ...mapMutations(['CLOSE_SIGN_UP_MODAL']),
            ...mapActions(['SIGN_UP']),
            closeModal() {
                this.clear();
                this.CLOSE_SIGN_UP_MODAL();
            },
            clear() {
                this.email = ''
                this.name = ''
                this.pwd = ''
            },
            submit() {

                this.$validator.validateAll()
                    .then(validated => {
                        if (validated) {
                            const email = this.email
                            const name = this.name
                            const pwd = this.pwd

                            this.SIGN_UP({email, name, pwd})
                                .then((user) => {
                                    this.closeModal()
                                })
                                .catch(error => {
                                    alert(`회원가입 실패 ${error.message}`)
                                })
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
