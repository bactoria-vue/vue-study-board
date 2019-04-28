<template>
    <button @click="logout">로그아웃</button>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "Logout",
        methods: {
            ...mapActions(['LOGOUT']),
            logout() {
                this.LOGOUT()
                    .then(()=> {
                        console.log("로그아웃되었습니다.");
                    })
            }
        }
    }
</script>

<style scoped>

</style>
