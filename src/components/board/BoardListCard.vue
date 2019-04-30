<template>
    <div>
        <template>
            <v-subheader>
                {{ board.title }}
            </v-subheader>
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
