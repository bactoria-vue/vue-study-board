<template>
    <v-dialog v-model="showSignUpModal" max-width="500px">
        <v-card>
            <v-card-title>
                회원가입
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="email" label="e-mail" required></v-text-field>
                <v-text-field
                        v-model="pwd"
                        :type="'password'"
                        label="password"
                        @keyup.enter="register()"
                        required
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click="register">등록</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations, mapState, mapActions} from 'vuex'

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
            register() {
                const email = this.email
                const name = this.name
                const pwd = this.pwd

                this.SIGN_UP({ email, name, pwd })
                    .then((user) => {
                        console.log(user)
                        this.closeModal()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
