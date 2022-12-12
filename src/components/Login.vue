<template>
    <div class="login">
        <div class="form-group">
            <label for="username" class="label">Gebruikersnaam</label>
            <input type="text" id="username" v-model="username" class="input" @keydown="focusNext"/>
        </div>
        <div class="form-group">
            <label for="password" class="label">Wachtwoord</label>
            <input type="password" id="password" v-model="password" class="input" @keydown="focusNext" />
        </div>
        <button @click="login" class="button button--heaven">Log in</button>
        <p class="error-message">{{ message }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import focusElement from '../js/focusElement.js';
const router = useRouter();
const API_URI = import.meta.env.VITE_API_URI;
const username = ref('');
const password = ref('');
const message = ref('');

onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push('/app');
    }
});

const focusNext = (event) => {
    if (event.key === 'Enter') {
        switch (event.target.id) {
            case 'username':
                focusElement('password');
                break;
            case 'password':
                login();
                break;
        }
    }
};

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
                router.push("/app");
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

.form-group {
    width: 100%;
}
</style>