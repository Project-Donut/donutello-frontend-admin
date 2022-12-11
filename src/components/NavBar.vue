<template>
    <nav class="navbar">
        <div class="navbar__logo" :onclick="clickLogo">
            <DonuttelloLogo alt />
        </div>
        <template v-if="!state.loading">
            <Avatar size="medium" style="cursor: pointer;" :label="state.user.username" shape="circle" @click="clickAvatar">{{state?.user?.username?.toUpperCase().charAt(0)}}</Avatar>
            <Menu ref="menu" :model="items" :popup="true" />
        </template>
    </nav>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '../api/user';

const router = useRouter();
const menu = ref(null);
const state = reactive({
    loading: true,
    user: null,
});
const items = ref([
    {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        command: () => router.push('/app/profile')
    },
    {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
            localStorage.clear("token");
            router.push('/');
        }
    }
]);
const clickLogo = () => router.push('/app');
const clickAvatar = event => menu.value.toggle(event);
onMounted(async () => {
    const response = await getUserInfo();
    state.loading = false;
    state.user = response.data;
});
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    vertical-align: center;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: .25em .75em .25em .5em;
}
.navbar__logo {
    height: 100%;
    width: fit-content;
}
</style>