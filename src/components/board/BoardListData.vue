<template>
    <div>
            <v-list-tile-content>
                <v-list-tile-title v-text="board.title"/>
            </v-list-tile-content>

            <v-spacer></v-spacer>

            <v-list-tile-sub-title>
                {{board.username}}
            </v-list-tile-sub-title>
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
