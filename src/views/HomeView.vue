<script setup>
import Login from '../components/Login.vue';
import DonuttelloLogo from '../components/svg/DonuttelloLogo.vue';
</script>

<template>
    <div class="home-view">
        <div class="home-view__logo">
            <DonuttelloLogo />
        </div>
        <h1>Custom Bestellingen</h1>
        <Login />
    </div>
</template>

<style scoped lang="scss">
h1 {
    width: fit-content;
}
.home-view > * {
    margin-left: auto;
    margin-right: auto;
}
.home-view__logo {
    width: 100%;
    max-width: 400px;
    margin-bottom: 2rem;
}
</style>
