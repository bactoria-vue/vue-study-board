<template>
    <div>
        <login-form class="login-form"/>
        <sign-up-modal />
        <logout/>
    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm";
    import SignUpModal from "../components/login/SignUpModal";
    import Logout from "../components/login/Logout";

    export default {
        name: "Login",
        components: {Logout, SignUpModal, LoginForm}
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
