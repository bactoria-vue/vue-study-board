<template>
    <v-dialog v-model="showModifyBoardModal" persistent max-width="500px">
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
    import {mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        name: "ModifyBoardModal",
        data() {
            return {
                boardInfo: {}
            }
        },
        props: ['showModifyBoardModal'],
        computed: {
            ...mapGetters({
                board: 'BOARD'
            })
        },
        watch: {
            showModifyBoardModal(val) {
                this.$log.debug(val)
            }
        },
        methods: {
            ...mapActions(['MODIFY_BOARD', 'GET_BOARD']),
            ...mapMutations(['TITLE']),
            submit() {
                this.$validator.validateAll()
                    .then(validated => {
                        const boardInfo = this.boardInfo
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
                this.$emit('close-modal');
            }
        },
        created() {
            const id = this.$route.params.id
            this.GET_BOARD({id})
                .then(_ => {
                    this.boardInfo = JSON.parse(JSON.stringify(this.board));
                })
        },

    }
</script>

<style scoped>

</style>
