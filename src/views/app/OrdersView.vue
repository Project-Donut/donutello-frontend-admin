<template>
    <DataTable :value="orders" striped-rows filterDisplay="menu" :filters="filters1" dataKey="_id">
        <template #empty>
            Geen bestellingen gevonden.
        </template>
        <template #loading>
            Bestellingen aan het laden...
        </template>
        <Column field="status" header="Status" >
            <template #body="{ data }">
                <span :class="'status-badge status-badge--' + data.status">{{ data.status }}</span>
            </template>
        </Column>
        <Column>
            <template #body="slotProps">
                <img :src="slotProps.data.customer.image" alt="Custom donut" />
            </template>
        </Column>
        <Column header="Naam" field="customer.fullName"></Column>
        <Column header="Adres" field="address.fullAddress"></Column>
        <Column header="Leverdatum">
            <template #body="slotProps">
                {{ formatDate(slotProps.data.dateBy) }}
            </template>
        </Column>
        <Column header="Acties" frozen alignFrozen="right">
            <template #body="slotProps">
                <div class="action-container">
                    <button v-if="slotProps.data.status === 'pending'" class="button button--subtle button--info"
                        title="Start"><i class="pi pi-play"></i></button>
                    <button v-if="slotProps.data.status === 'processing'" class="button button--subtle button--warning"
                        title="Verzenden"><i class="pi pi-send"></i></button>
                    <button v-if="slotProps.data.status === 'shipped'" class="button button--subtle button--succeed"><i
                            class="pi pi-check" title="Afronden"></i></button>
                    <button class="button button--subtle button--error" title="Annulleren"><i
                            class="pi pi-trash"></i></button>
                </div>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';

import { getOrders } from '../../api/order';
import { formatDate } from '../../js/formatDate';

const filters1 = ref({
    'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
})
const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
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
.action-container {
    display: flex;
    justify-content: space-between;
}

.action-container button:not(:last-of-type) {
    margin-right: 0.5rem;
}

.status-badge {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-transform: capitalize;
}

.status-badge--pending {
    background-color: var(--gray-8);
}

.status-badge--processing {
    background-color: var(--basic-info);
    color: white;
}

.status-badge--shipped {
    background-color: var(--basic-warning);
    color: white;
}

.status-badge--delivered {
    background-color: var(--basic-success);
    color: white;
}

.status-badge--cancelled {
    background-color: var(--basic-error);
    color: white;
}
</style>