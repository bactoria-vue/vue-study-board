<template>
    <div>
        <login-form class="login-form"/>
        <sign-up-modal />
    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm";
    import SignUpModal from "../components/login/SignUpModal";

    export default {
        name: "Login",
        components: {SignUpModal, LoginForm}
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
