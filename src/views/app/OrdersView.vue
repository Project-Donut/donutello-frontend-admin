<template>
    <table>
        <thead>
            <tr>
                <th>Index</th>
                <th>Afbeelding</th>
                <th>Naam</th>
                <th>Adres</th>
                <th>Datum Levering</th>
                <th>Besteld Op</th>
                <th>Acties</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
                <td>{{ index }}</td>
                <td><img /></td>
                <td>{{ order.name }}</td>
                <td>{{ order.address }}</td>
                <td>{{ order.order.byDate.toLocaleDateString() }}</td>
                <td>{{ order.createdDate.toLocaleDateString() }}</td>
                <td>
                    <button class="button button--heaven">Volgende</button>
                    <button class="button button--danger">Verwijder</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
const orders = [
    {
        name: "John Doe",
        address: "Straat 1, 1234 AB, Plaats",
        phone: "0612345678",
        order: {
            glaze_colour: "paars",
            glaze_taste: "aardbei",
            toppings: {
                kind: "sprinkles",
                colour: "roze",
                taste: "aardbei",
            },
            filling: "aardbei",
            count: 70,
            byDate: new Date("2023-10-20T00:00:00.000Z"),
        },
        createdDate: new Date("2022-12-04T00:00:00.000Z"),
    }
]
</script>
<style scoped>
td:first-of-type, th:first-of-type {
    min-width: 50px;
    text-align: center;
}
</style>