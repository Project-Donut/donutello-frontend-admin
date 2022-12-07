<template>
    <table>
        <thead>
            <tr>
                <th>Status</th>
                <th>Afbeelding</th>
                <th>Naam</th>
                <th>Datum Levering</th>
                <th class="sticky right">Acties</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(order) in orders" :key="order.id">
                <td :class="`status--${order.status}`" >{{ order.status }}</td>
                <td><img /></td>
                <td>{{ order.customer.company || `${order.customer.lastName} ${order.customer.firstName}` }}</td>
                <td>{{ (new Date(order.dateBy)).toLocaleDateString()}}</td>
                <td class="sticky right">
                    <button class="button button--heaven">Volgende</button>
                    <button class="button button--danger">
                        <font-awesome-icon icon="trash" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
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
td:first-of-type, th:first-of-type {
    min-width: 2em;
    text-align: center;
}

td:last-of-type, th:last-of-type {
    text-align: center;
}

td.status--delivered {
    background-color: var(--basic-success-light);
}

td.status--processing {
    background-color: var(--basic-warning-light);
}

td.status--shipped {
    background-color: var(--basic-info-light);
}

td.status--cancelled {
    background-color: var(--basic-danger-light);
}
</style>