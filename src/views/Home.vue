<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <user-info/>
    </div>
</template>

<script>
    import UserInfo from "../components/UserInfo";
    export default {
        components: {UserInfo}
    }
</script>
