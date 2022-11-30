<template>
    <div class="login">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
        <button @click="login">Login</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const API_URI = import.meta.env.VITE_API_URI;
const username = ref('');
const password = ref('');

const login = () => {
    throw new Error('Not implemented');
}
</script>
<style scoped lang="scss">
.login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 230px;
    input {
        margin-bottom: 1em;
    }
}
</style>