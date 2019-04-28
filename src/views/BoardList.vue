<template>
    <div>
        <board-list/>
        <add-board-modal/>
        <v-btn color="primary" @click="addBoardModal">글쓰기</v-btn>
    </div>
</template>

<script>
    import BoardList from "../components/board/BoardList";
    import {mapMutations} from 'vuex';
    import AddBoardModal from "../components/board/AddBoardModal";

    export default {
        name: "Board",
        components: {AddBoardModal, BoardList},
        methods: {
            ...mapMutations(['SHOW_ADD_BOARD_MODAL']),
            addBoardModal() {
                this.SHOW_ADD_BOARD_MODAL();
            }
        }
    }
</script>

<style scoped>

</style>
