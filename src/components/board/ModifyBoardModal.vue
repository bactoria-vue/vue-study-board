<template>
    <v-dialog v-model="showModifyBoardModal" max-width="500px">
        <v-card>
            <v-card-title>
                글 수정
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="title" label="제목" @keyup.enter="modify()" required></v-text-field>
                <v-text-field v-model="content" label="내용" :type="'textarea'" @keyup.enter="modify()" required></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click="modify">수정</v-btn>
                <v-btn color="primary" flat @click="closeModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';

    export default {
        name: "ModifyBoardModal",
        computed: {
            ...mapState(['showModifyBoardModal', 'board'])
        },
        props: ['title', 'content'],
        methods: {
            ...mapActions(['MODIFY_BOARD', 'GET_BOARD']),
            ...mapMutations(['CLOSE_MODIFY_BOARD_MODAL']),
            modify() {
                const id = this.board.id;
                const title = this.title;
                const content = this.content;
                this.MODIFY_BOARD({id, title, content})
                    .then(docRef => {
                        this.closeModal();
                        this.GET_BOARD({id});
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            },
            clear() {
                this.title = '';
                this.content = '';
            },
            closeModal() {
                this.CLOSE_MODIFY_BOARD_MODAL();
            }
        }
    }
</script>

<style scoped>

</style>
