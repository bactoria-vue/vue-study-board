<template>
    <div>
        <template>
            <v-subheader>
                {{ board.title }}
            </v-subheader>
        </template>
    </div>
</template>

<script>
    export default {
        name: "BoardListData",
        props: ['board']
    }
</script>

<style scoped>

</style>
