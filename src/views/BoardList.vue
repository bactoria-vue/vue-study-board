<template>
    <div>
        <board-list/>
        <add-board-modal/>
    </div>
</template>

<script>
    import BoardList from "../components/board/BoardList";
    import AddBoardModal from "../components/board/AddBoardModal";

    export default {
        name: "Board",
        components: {AddBoardModal, BoardList},
    }
</script>

<style scoped>

</style>
