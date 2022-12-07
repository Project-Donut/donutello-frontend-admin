<template>
    <DataTable :value="orders" >
        <Column header="Status" field="status" ></Column>
        <Column header=" ">
            <template #body="slotProps">
                <img :src="slotProps.data.customer.fullName" alt="Custom donut"/>
            </template>
        </Column>
        <Column header="Naam" field="customer.fullName" ></Column>
        <Column header="Adres" field="address.fullAddress" ></Column>
        <Column header="Leverdatum" field="dateBy" ></Column>
        <Column header="Acties">
            <template #body="slotProps">
                <button v-if="slotProps.data.status === 'pending'" class="button button--heaven">Start</button>
                <button v-if="slotProps.data.status === 'processing'" class="button button--lemon">Verstuur</button>
                <button v-if="slotProps.data.status === 'shipped'" class="button">Afronden</button>
                <button class="button button--error"></button>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { getOrders } from '../../api/order';

const orders = reactive([]);
onMounted(async () => {
    const result = await getOrders();
    if (result.status === "success") {
        orders.push(...result.data);
        // sort by priority
        orders.sort((a, b) => (a.priority < b.priority) ? 1 : ((b.priority < a.priority) ? -1 : 0));
    }
});

</script>
<style scoped>
</style>