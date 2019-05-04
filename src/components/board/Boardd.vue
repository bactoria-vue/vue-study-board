<template>
    <div>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>{{board.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list three-line>
                    {{board.content}}
                </v-list>
            </v-card>
            <div align="center">
                <v-btn v-if=isAuthorizated color="primary" @click="showModifyBoard">수정</v-btn>
                <v-btn v-if=isAuthorizated color="warning" @click="deleteBoard">삭제</v-btn>
            </div>
        </v-flex>
        <modify-board-modal :title="board.title" :content="board.content"/>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import ModifyBoardModal from "./ModifyBoardModal";
    import firebase from 'firebase'

    export default {
        name: "Boardd",
        components: {ModifyBoardModal},
        data() {
            return {
                isAuthorizated: false
            }
        },
        computed: {...mapState(['board'])},
        created() {
            const id = this.$route.params
            this.SET_BOARD(id).then(res => {
                let uid = firebase.auth().currentUser.uid;
                this.isAuthorizated = uid === this.board.uid;
            })
        },
        methods: {
            ...mapActions(['SET_BOARD', 'DELETE_BOARD']),
            ...mapMutations(['SHOW_MODIFY_BOARD_MODAL']),
            showModifyBoard() {
                this.SHOW_MODIFY_BOARD_MODAL()
            },
            deleteBoard() {
                const id = this.board.id
                this.DELETE_BOARD({id})
            }
        },
        updated() {
                this.$log.debug(this.board)
        }
    }
</script>

<style scoped>

</style>
