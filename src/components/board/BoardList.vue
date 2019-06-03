<template>
<div>
    <v-layout row>
        <v-flex xs8 offset-xs2>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>게시판</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="board in boards" :key="board.id">
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
    <add-board-modal :show-add-board-modal="showAddBoardModal" @close-modal="closeModal" />
</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading';
    import BoardListData from "./BoardListData";
    import AddBoardModal from "./AddBoardModal";

    export default {
        name: "BoardList",
        components: {BoardListData, InfiniteLoading, AddBoardModal},
        data() {
            return {
                showAddBoardModal: false
            }
        },
        computed: {
            ...mapGetters({
                boards: 'BOARDS',
                lastDoc: 'LAST_DOC'
            })
        },
        methods: {
            ...mapActions(['GET_BOARDS']),
            addBoardModal() {
                this.showAddBoardModal = true;
                this.$log.debug('log from function outside component.');
            },
            closeModal() {
                this.showAddBoardModal = false;
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
        },

    }
</script>

<style scoped>

</style>