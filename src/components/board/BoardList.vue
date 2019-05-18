<template>
    <v-layout row>
        <v-flex xs8 offset-xs2>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>게시판</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="board in boards">
                        <router-link :to="'/board/' + board.id">
                            <board-list-data :board="board"/>
                        </router-link>
                    </v-list-tile>
                </v-list>
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </v-card>
        </v-flex>
        <v-flex xs2>
            <v-btn color="primary" @click="addBoardModal">글쓰기</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import InfiniteLoading from 'vue-infinite-loading';
    import BoardListData from "./BoardListData";

    export default {
        name: "BoardList",
        components: {BoardListData, InfiniteLoading},
        computed: {
            ...mapState(['boards', 'lastDoc'])
        },
        created() {
            this.GET_BOARDS(this.lastDoc)
        },
        methods: {
            ...mapActions(['GET_BOARDS']),
            ...mapMutations(['SHOW_ADD_BOARD_MODAL']),
            addBoardModal() {
                this.SHOW_ADD_BOARD_MODAL();
                this.$log.debug('log from function outside component.');
            },
            infiniteHandler($state) {
                this.$log.debug("fetch boards")
                this.GET_BOARDS(this.lastDoc)
                    .then(docs => {
                        if (docs.docs.length) {
                            $state.loaded();
                        } else {
                            $state.complete();
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
