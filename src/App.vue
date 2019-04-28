<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <router-link to="/">Home</router-link>
                <router-link to="/login" v-if="!isAuthenticated">Login</router-link>
                <router-link to="/login" v-else>Logout</router-link>
                <router-link to="/board">Board</router-link>
                <span class="font-weight-light">가나다라</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'App',
        computed: {
            ...mapState(['isAuthenticated'])
        }
    }
</script>
