<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="app-wrapper">
        <div>

        </div>
        <div class="content-wrapper">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped>
.app-wrapper {
    display: grid;
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    grid-template-rows: 3em calc(100vh - 3em);
}


.content-wrapper {
    overflow: auto;
    margin: 0px auto;
    width: 1200px;
}

@media (max-width: 1200px) {
    .content-wrapper {
        width: 100%;
    }
}
</style>
