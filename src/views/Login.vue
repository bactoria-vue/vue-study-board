<template>
    <div>
        <login-form class="login-form"/>
    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm";

    export default {
        name: "Login",
        components: {LoginForm}
    }
</script>

<style scoped>
    .login-form {
        width: 350px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
