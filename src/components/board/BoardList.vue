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

            <div align="center">
                <v-btn color="primary" @click="addBoardModal">글쓰기</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import BoardListCard from "./BoardListCard";
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "BoardList",
        components: {BoardListCard},
        computed: {
            ...mapState(['boards'])
        },
        created() {
            this.SET_BOARDS()
        },
        methods: {
            ...mapActions(['SET_BOARDS']),
            ...mapMutations(['SHOW_ADD_BOARD_MODAL']),
            addBoardModal() {
                this.SHOW_ADD_BOARD_MODAL();
            }
        }
    }
</script>

<style scoped>

</style>
