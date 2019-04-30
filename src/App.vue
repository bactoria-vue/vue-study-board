<template>
    <v-app>
        <head-toolbar/>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import HeadToolbar from "./components/HeadToolbar";

    export default {
        name: 'App',
        components: {HeadToolbar},
    }
</script>
