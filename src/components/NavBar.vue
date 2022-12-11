<template>
    <nav>
        <div class="navbar__logo" @click="clickLogo">
            <DonuttelloLogo alt/>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';
const router = useRouter();

const clickLogo = () => {
    router.push('/app');
}

</script>

<style scoped>
    .navbar__logo {
        height: 100%;
        width: fit-content;
        padding: .125em .5em;
    }
</style>