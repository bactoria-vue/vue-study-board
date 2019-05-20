<template>
    <div>
        email : {{user.email}}
        <div>
        name: <input v-model.lazy="user.name"/>
        </div>
        phone : <input v-model.lazy="user.phone"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "UserInfo",
        data() {
            return {
                user: Object,
                phone: String
            }
        },
        watch: {
            user: {
                handler(val) {
                    this.SET_USER(val)
                },
                deep: true
            }
        },
        methods: {
            ...mapActions(['GET_USER', 'SET_USER'])
        },
        created() {
            this.GET_USER()
                .then(user => {
                    this.user = user;
                })
        },
    }
</script>

<style scoped>

</style>
