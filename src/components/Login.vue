<template>
    <div class="login">
        <label for="username">Gebruikersnaam</label>
        <input type="text" id="username" v-model="username" />
        <label for="password">Wachtwoord</label>
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
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 230px;
}
</style>