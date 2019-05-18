<template>
    <v-dialog v-model="showModifyBoardModal" max-width="500px">
        <v-card>
            <v-card-title>
                글 수정
            </v-card-title>
            <v-form>
                <v-text-field
                        v-validate="'required|max:12'"
                        v-model="title"
                        label="Title"
                        name="title"
                        autofocus
                        :error-messages="errors.first('title')"
                        @keyup.enter="submit()"
                />
                <v-textarea
                        v-validate="'required|max:1000'"
                        v-model="content"
                        label="Content"
                        name="content"
                        auto-grow
                        :error-messages="errors.first('content')"
                />
                <v-btn color="primary" flat @click="submit">수정</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';

    export default {
        name: "ModifyBoardModal",
        data() {
            return {
                title: '',
                content: ''
            }
        },
        created() {
            const id = this.$route.params.id
            this.GET_BOARD({id})
                .then(_ => {
                    this.title = this.board.title
                    this.content = this.board.content
                })
        },
        computed: {
            ...mapState(['showModifyBoardModal', 'board']),
        },
        methods: {
            ...mapActions(['MODIFY_BOARD', 'GET_BOARD']),
            ...mapMutations(['CLOSE_MODIFY_BOARD_MODAL', 'TITLE']),
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        const board = this.board
                        board.title = this.title
                        board.content = this.content

                        if (validated) {
                            this.MODIFY_BOARD(board)
                                .then(_ => {
                                    this.closeModal();
                                    this.GET_BOARD(board);
                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        }
                    })
            },
            closeModal() {
                this.CLOSE_MODIFY_BOARD_MODAL();
            }
        }
    }
</script>

<style scoped>

</style>
