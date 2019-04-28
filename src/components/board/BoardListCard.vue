<template>
    <div>
        <template>
            <v-subheader>
                {{ board.title }}
            </v-subheader>
            <!--
                                    <v-list-tile
                                            v-else
                                            :key="item.title"
                                            avatar
                                            @click=""
                                    >

                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    -->
        </template>
    </div>
</template>

<script>
    export default {
        name: "BoardListCard",
        props: ['board']
    }
</script>

<style scoped>

</style>
