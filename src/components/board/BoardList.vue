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
                        <board-list-data :board="board"/>
                    </router-link>
                </v-list>
                <infinite-loading v-if="page" @infinite="infiniteHandler"></infinite-loading>
            </v-card>

            <div align="center">
                <v-btn color="primary" @click="addBoardModal">글쓰기</v-btn>
            </div>
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
            ...mapState(['boards', 'page'])
        },
        created() {
            this.$log.debug('BoardList Component')
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
                this.GET_BOARDS(this.page)
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
