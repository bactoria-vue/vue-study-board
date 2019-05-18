<template>
    <v-dialog v-model="showModifyBoardModal" max-width="500px">
        <v-card>
            <v-card-title>
                글 수정
            </v-card-title>
            <v-form>
                <v-text-field
                        v-validate="'required|max:12'"
                        v-model="boardInfo.title"
                        label="Title"
                        name="title"
                        autofocus
                        :error-messages="errors.first('title')"
                />
                <v-textarea
                        v-validate="'required|max:1000'"
                        v-model="boardInfo.content"
                        label="Content"
                        name="content"
                        auto-grow
                        :error-messages="errors.first('content')"
                />
                <v-btn color="primary" flat @click="submit">수정</v-btn>
                <v-btn color="primary" flat @click="closeModal">닫기</v-btn>
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
                boardInfo: {}
            }
        },
        created() {
            const id = this.$route.params.id
            this.GET_BOARD({id})
                .then(_ => {
                    this.boardInfo = JSON.parse(JSON.stringify(this.board));
                })
        },
        computed: {
            ...mapState(['board']),
            showModifyBoardModal: {
                get() {
                    return this.$store.state.showModifyBoardModal
                },
                set() {
                    this.CLOSE_MODIFY_BOARD_MODAL()
                }
            }
        },
        watch: {
            showModifyBoardModal(val) {
                this.$log.debug(val)
            }
        },
        methods: {
            ...mapActions(['MODIFY_BOARD', 'GET_BOARD']),
            ...mapMutations(['CLOSE_MODIFY_BOARD_MODAL', 'TITLE']),
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        const boardInfo = this.boardInfo
                    console.log(this.boardInfo)

                        if (validated) {
                            this.MODIFY_BOARD(boardInfo)
                                .then(_ => {
                                    this.closeModal();
                                    this.GET_BOARD(boardInfo);
                                })
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
