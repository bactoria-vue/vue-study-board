<template>
    <div>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>{{board.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list style="background-color: ghostwhite">
                    작성자 : {{board.username}}
                </v-list>
                <v-list three-line>
                    {{board.content}}
                </v-list>
            </v-card>
            <div align="center">
                <v-btn v-if=isAuthorizated color="primary" @click.stop="showModifyBoard()">수정</v-btn>
                <v-btn v-if=isAuthorizated color="warning" @click.stop="deleteBoard()">삭제</v-btn>
            </div>
        </v-flex>
        <modify-board-modal/>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import ModifyBoardModal from "./ModifyBoardModal";
    import firebase from 'firebase'

    export default {
        name: "BoardData",
        components: {ModifyBoardModal},
        data() {
            return {
                isAuthorizated: false
            }
        },
        computed: {...mapState(['board'])},
        created() {
            const id = this.$route.params
            this.GET_BOARD(id)
                .then(res => {
                    let uid = firebase.auth().currentUser.uid;
                    this.isAuthorizated = uid === this.board.uid;
                    this.$log.debug(this.board)
                })
        },
        methods: {
            ...mapActions(['GET_BOARD', 'DELETE_BOARD']),
            ...mapMutations(['SHOW_MODIFY_BOARD_MODAL', 'CLEAR_BOARD']),
            showModifyBoard() {
                this.SHOW_MODIFY_BOARD_MODAL()
            },
            deleteBoard() {
                const id = this.board.id
                this.DELETE_BOARD({id})
            }
        },
        destroyed() {
            this.CLEAR_BOARD()
        }
    }
</script>

<style scoped>

</style>
