<template>
    <DataTable  :value="orders" :lazy="true" v-model:filters="filters" ref="dt" dataKey="_id"  :paginator="true" :rows="10"
        :loading="loading" @page="onPage($event)" @sort="onSort($event)" @filter="onFilter($event)" filterDisplay="menu" @row-click="rowClick($event)"
        :globalFilterFields="['status']" :totalRecords="totalRecords" responsiveLayout="scroll" removableSort striped-rows rowHover >
        <template #empty>
            Geen bestellingen gevonden.
        </template>
        <template #loading>
            Bestellingen aan het laden...
        </template>
        <Column field="status" header="Status" :showFilterMenu="true" :filterMatchModeOptions="[FilterMatchMode.EQUALS]"
            headerStyle="width: 150px">
            <template #body="{ data }">
                <span :class="'status-badge status-badge--' + trimStatus(data.status)">{{ trimStatus(data.status) }}</span>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <Dropdown v-model="filterModel.value" @change="filterCallback" :options="statusOptions" placeholder="Any"
                    class="p-column-filter" :showClear="true">
                    <template #value="slotProps">
                        <div style="margin: .5em 0em">
                            <span :class="'status-badge status-badge--' + trimStatus(slotProps.value)" v-if="slotProps.value">{{
                                trimStatus(slotProps.value)
                                }}</span>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div style="margin: .5em 0em">
                            <span :class="'status-badge status-badge--' + trimStatus(slotProps.option)">{{
                                trimStatus(slotProps.option) }}</span>
                        </div>
                    </template>
                </Dropdown>
            </template>
        </Column>
        <Column headerStyle="width: 100px">
            <template #body="slotProps">
                <img :src="slotProps.data.image" alt="Custom donut" width="100" />
            </template>
        </Column>
        <Column header="Naam" field="customer.fullName" :sortable="true"></Column>
        <Column header="Bedrijf" field="customer.company" :sortable="true"></Column>
        <Column header="Adres" field="address" :sortable="true"></Column>
        <Column header="Leverdatum" field="dateBy" :sortable="true">
            <template #body="slotProps">
                {{ formatDate(slotProps.data.dateBy) }}
            </template>
        </Column>
        <template #footer>
            <div style="margin: 0 auto; width: fit-content;">Found {{totalRecords}} records</div>
        </template>
        </DataTable>
        <OrderDialog :open="open" :order="selectedOrder" @close="onClose"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import OrderDialog from '../../components/OrderDialog.vue';

import { getOrders } from '../../api/order';
import { formatDate } from '../../js/formatDate';
import { createURLQueryFromPrimeVue } from '../../js/createURLQuery';

// From primevue documentation
const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const orders = ref();
const filters = ref({
    'status': { value: null, matchMode: FilterMatchMode.EQUALS }
});
const lazyParams = ref({});
const statusOptions = ['100 - pending', '200 - processing', '300 - shipped', '400 - delivered', '000 - cancelled'];
const selectedOrder = ref(null);
const open = ref(false);

const rowClick = (e) => {
    open.value = true;
    selectedOrder.value = e.data;
}

const onClose = (e) => {
    open.value = false;
    selectedOrder.value = null;
}

const trimStatus = (status) => {
    return status.slice(6);
}

const loadData = () => {
    loading.value = true;
    const urlQuery = createURLQueryFromPrimeVue(lazyParams.value);
    getOrders(urlQuery)
        .then(response => {
            orders.value = response.data.orders;
            totalRecords.value = response.data.totalRecords;
            loading.value = false;
        });
}

let prevStatusFilter = null;
const statusFilterCallback = e => {
    if (prevStatusFilter === e.value) {
        return;
    }
    orders.length = 0;
    if (e.value !== null) {
        query.value = `status=${e.value}`;
    }
    else {
        query.value = '';
    }
    prevStatusFilter = e.value;
}

const onPage = (event) => {
    lazyParams.value = event;
    loadData();
}

const onFilter = () => {
    lazyParams.value.filters = filters.value;
    loadData();
}

const onSort = (event) => {
    lazyParams.value = event;
    loadData();
} 

onMounted(() => {
    loading.value = true;

    lazyParams.value = {
        first: 0,
        rows: dt.value.rows,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    };

    loadData();
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
    background-color: var(--gray-light-2);
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