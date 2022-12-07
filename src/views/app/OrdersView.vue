<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Afbeelding</th>
                <th>Naam</th>
                <th>Adres</th>
                <th>Datum Levering</th>
                <th>Besteld Op</th>
                <th class="sticky right">Acties</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
                <td>{{ index }}</td>
                <td><img /></td>
                <td>{{ order.customer.company || `${order.customer.lastName} ${order.customer.firstName}` }}</td>
                <td>{{ `${order.address.street}, ${order.address.postalCode} ${order.address.city}, ${order.address.country}` }}</td>
                <td>{{ (new Date(order.dateBy)).toLocaleDateString()}}</td>
                <td>{{ (new Date(order.createdAt)).toLocaleDateString() }}</td>
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
</style>