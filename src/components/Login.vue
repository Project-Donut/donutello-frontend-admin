<template>
    <div class="login">
        <div class="form-group">
            <label for="username" class="label">Gebruikersnaam</label>
            <input type="text" id="username" v-model="username" class="input" />
        </div>
        <div class="form-group">
            <label for="password" class="label">Wachtwoord</label>
            <input type="password" id="password" v-model="password" class="input" />
        </div>
        <button @click="login" class="button button--heaven">Log in</button>
        <p class="error-message">{{ message }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const API_URI = import.meta.env.VITE_API_URI;
const username = ref('');
const password = ref('');
const message = ref('');

const login = () => {
    fetch(`${API_URI}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.status === "success") {
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("token", response.data.accessToken);
                message.value = "";
            }
            else if (response.status === "fail") {
                message.value = response.message;
            }
        });
}
</script>
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 230px;
}

button {
    margin-bottom: 1em;
}
</style>