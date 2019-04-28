<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>게시판</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list three-line>
                    <router-link :to="'/board/' + board.id" v-for="board in boards">
                        <board-list-card :board="board"/>
                    </router-link>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import BoardListCard from "./BoardListCard";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "BoardList",
        components: {BoardListCard},
        computed: {
            ...mapState(['boards'])
        },
        created() {
            this.GET_BOARDS()
        },
        methods: {
            ...mapActions(['GET_BOARDS'])
        }
    }
</script>

<style scoped>

</style>
