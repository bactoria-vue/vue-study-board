<template>
    <v-dialog v-model="showAddBoardModal" max-width="500px">
        <v-card>
            <v-card-title>
                글쓰기
            </v-card-title>
            <v-card-text>
                <v-text-field
                        v-model="title"
                        label="제목"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="content"
                        :type="'textarea'"
                        label="내용"
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
    import {mapActions, mapState, mapMutations} from 'vuex';

    export default {
        name: "AddBoardModal",
        data() {
            return {
                title: '',
                content: ''
            }
        },
        computed: {
            ...mapState(['showAddBoardModal'])
        },
        methods: {
            ...mapActions(['SET_BOARD']),
            ...mapMutations(['CLOSE_ADD_BOARD_MODAL']),
            register() {
                const title = this.title;
                const content = this.content;
                this.SET_BOARD({title, content})
                    .then(docRef => {
                        this.closeModal();
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            },
            closeModal() {
                this.clear();
                this.CLOSE_ADD_BOARD_MODAL();
            },
            clear() {
                this.title = '';
                this.content = '';
            },
        }
    }
</script>

<style scoped>

</style>
