<template>
    <v-dialog v-model="showSignUpModal" persistent max-width="500px">
        <v-card>
            <v-card-title>
                회원가입
            </v-card-title>
            <v-form>
                <v-text-field
                        v-validate="'required|email'"
                        v-model="account.email"
                        label="email"
                        name="e-mail"
                        autofocus
                        :error-messages="errors.first('e-mail')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-text-field
                        :type="'password'"
                        v-validate="'required|min:6|max:20'"
                        v-model="account.pwd"
                        name="password"
                        label="Password"
                        :error-messages="errors.first('password')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-text-field
                        v-validate="'required|min:2|max:10'"
                        v-model="account.username"
                        name="username"
                        label="Username"
                        :error-messages="errors.first('username')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-text-field
                        v-validate="'numeric'"
                        v-model="account.phone"
                        name="phone"
                        label="Phone"
                        :error-messages="errors.first('phone')"
                        @keyup.enter="submit()"
                ></v-text-field>
                <v-btn color="primary" flat @click="submit">등록</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "SignUpModal",
        data() {
            return {
                account: {
                    email: null,
                    pwd: null,
                    username: null,
                    phone: null
                }
            }
        },
        props: ['showSignUpModal'],
        watch: {
            showSignUpModal(val) {
                this.$log.debug(val)
            }
        },
        methods: {
            ...mapActions(['SIGN_UP']),
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        if (validated) {
                            this.SIGN_UP(this.account)
                                .then(_ => {
                                    this.closeModal()
                                })
                        }
                    })
            },
            closeModal() {
                this.$emit('close-modal');
            },
            clear() {
                this.account = {}
            },
        }
    }
</script>

<style scoped>
</style>
