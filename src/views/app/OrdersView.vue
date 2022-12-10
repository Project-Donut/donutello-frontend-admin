<template>
    <DataTable removableSort :value="orders" :paginator="true" striped-rows :rows="10" dataKey="_id" v-model:filters="filters"
        filterDisplay="menu" responsiveLayout="scroll" :globalFilterFields="['status']">
        <template #empty>
            Geen bestellingen gevonden.
        </template>
        <template #loading>
            Bestellingen aan het laden...
        </template>
        <Column field="status" header="Status" :showFilterMenu="true" :filterMatchModeOptions="[FilterMatchMode.EQUALS]" style="min-width:12rem">
            <template #body="{ data }">
                <span :class="'status-badge status-badge--' + data.status">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <Dropdown :ref="statusDropdown" v-model="filterModel.value" @change="e => { filterCallback(); statusFilterCallback(e) }" :options="statusOptions"
                    placeholder="Any" class="p-column-filter" :showClear="true">
                    <template #value="slotProps">
                        <span :class="'status-badge status-badge--' + slotProps.value" v-if="slotProps.value">{{
                                slotProps.value
                        }}</span>
                        <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                        <span :class="'status-badge status-badge--' + slotProps.option">{{ slotProps.option }}</span>
                    </template>
                </Dropdown>
            </template>
        </Column>
        <Column>
            <template #body="slotProps">
                <img :src="slotProps.data.customer.image" alt="Custom donut" />
            </template>
        </Column>
        <Column header="Naam" field="customer.fullName" :sortable="true"></Column>
        <Column header="Adres" field="address.fullAddress" :sortable="true"></Column>
        <Column header="Leverdatum" field="dateBy" :sortable="true">
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
import { FilterMatchMode } from 'primevue/api';

import { getOrders } from '../../api/order';
import { formatDate } from '../../js/formatDate';

const orders = reactive([]);
const query = ref('');
const filters = ref({
    'status': { value: null, matchMode: FilterMatchMode.EQUALS }
});
const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

let statusDropdown = ref(null);

const loadOrders = async () => {
    const result = await getOrders(query.value);
    if (result.status === "success") {
        orders.push(...result.data);
        // sort by priority
        orders.sort((a, b) => (a.priority < b.priority) ? 1 : ((b.priority < a.priority) ? -1 : 0));
    }
}

let prevStatusFilter = null;
const statusFilterCallback = e => {
    if (prevStatusFilter === e.value) {
        return;
    }
    orders.length = 0;
    console.log(e.value);
    if (e.value !== null) {
        query.value = `status=${e.value}`;
    }
    else {
        query.value = '';
    }
    loadOrders();
    prevStatusFilter = e.value;
}

onMounted(loadOrders);
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