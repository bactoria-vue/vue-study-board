<template>
    <div>
        {{board.id}}
        {{board.title}}
        {{board.content}}

        <modify-board-modal :title="board.title" :content="board.content"/>
        <v-btn color="primary" @click="showModifyBoard">수정</v-btn>
        <v-btn color="primary" @click="deleteBoard">삭제</v-btn>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import ModifyBoardModal from "./ModifyBoardModal";

    export default {
        name: "Boardd",
        components: {ModifyBoardModal},
        created() {
            const id = this.$route.params
            this.GET_BOARD(id)
        },
        computed: {...mapState(['board'])},
        methods: {
            ...mapActions(['GET_BOARD', 'DELETE_BOARD']),
            ...mapMutations(['SHOW_MODIFY_BOARD_MODAL']),
            showModifyBoard() {
                this.SHOW_MODIFY_BOARD_MODAL()
            },
            deleteBoard() {
                const id = this.board.id
                this.DELETE_BOARD({id})
            }
        }


    }
</script>

<style scoped>

</style>
