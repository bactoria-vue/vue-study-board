<template>
    <v-dialog v-model="showAddBoardModal" max-width="800px">
        <v-card>
            <v-card-title>
                글쓰기
            </v-card-title>
            <v-form>
                <v-text-field
                        v-validate="'required|max:12'"
                        v-model="boardInfo.title"
                        label="Title"
                        name="title"
                        autofocus
                        :error-messages="errors.first('title')"
                        @keyup.enter="submit()"
                />
                <v-textarea
                        v-validate="'required|max:1000'"
                        v-model="boardInfo.content"
                        label="Content"
                        name="content"
                        auto-grow
                        :error-messages="errors.first('content')"
                />
                <v-btn color="primary" flat @click="submit">등록</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';

    export default {
        name: "AddBoardModal",
        data() {
            return {
                boardInfo: {}
            }
        },
        computed: {
            showAddBoardModal: {
                get() {
                    return this.$store.state.showAddBoardModal
                },
                set() {
                    this.CLOSE_ADD_BOARD_MODAL()
                }
            }
        },
        watch: {
            showAddBoardModal(val) {
                this.$log.debug(val)
            }
        },
        methods: {
            ...mapActions(['ADD_BOARD']),
            ...mapMutations(['CLOSE_ADD_BOARD_MODAL']),
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        if (validated) {
                            this.ADD_BOARD(this.boardInfo)
                                .then(_ => {
                                    this.closeModal();
                                })
                        }
                    })
            },
            closeModal() {
                this.clear();
                this.CLOSE_ADD_BOARD_MODAL();
            },
            clear() {
                this.boardInfo = {}
            },
        }
    }
</script>

<style scoped>

</style>
