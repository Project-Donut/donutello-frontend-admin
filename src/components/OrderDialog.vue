<template>
    <Dialog :header="header" v-model:visible="state.open" :maximizable="true" :modal="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" @hide="$emit('close')">
        <h2>Donut</h2>
        <div class="order__content">
            <span>
                <label>Hoeveelheid</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.count }}
                    </template>
                    <template #content>
                        <NumberInput v-model="state.edit.count" />
                    </template>
                </Inplace>
            </span>
        </div>
        <h2>Informatie Klant</h2>
        <div class="order__content">
            <span>
                <label>Bedrijf</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.customer.company }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.customer.company" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Naam</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.customer.fullName }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.customer.fullName" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Telefoonnummer</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.customer.phone }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.customer.phone" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Email</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.customer.email }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.customer.email" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Lever Adres</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.address }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.address" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Factuuradres</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.customer.billingAddress }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.edit.customer.billingAddress" autoFocus class=".input" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Levertijd</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ formatDate(state.order.dateBy) }}
                    </template>
                    <template #content>
                        <Calendar :showTime="true" v-model="state.edit.dateBy" />
                    </template>
                </Inplace>
            </span>
            <span>
                <label>Status</label>
                <Inplace :closable="true">
                    <template #display>
                        {{ state.order.status }}
                    </template>
                    <template #content>
                        <TextInput v-model="state.order.status" />
                    </template>
                </Inplace>
            </span>
        </div>
        <template #footer>
            <button :disabled="edit !== state.order" class="button button--success">Save</button>
        </template>
    </Dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits, reactive, watch, onMounted } from 'vue';
import { formatDate } from '../js/formatDate';
const props = defineProps({
    order: Object,
    open: Boolean
});
const state = reactive({
    open: props.open,
    order: props.order,
    edit: props.order
});
const emits = defineEmits(['close']);
const header = computed(() => {
    const customer = state?.order?.customer?.company || state?.order?.customer?.fullName || "";
    return `Bestelling ${customer}`;
})

watch(() => props.open, (current) => state.open = current);
watch(() => props.order, (current) => state.order = state.edit = current);

onMounted(() => {
    state.edit = Object.assign({}, state.order);
});
</script>

<style scoped>
.p-inplace {
    margin: .5em 0;
}

.order__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

label {
    font-weight: 600;
}

h2 {
    margin: 0;
    margin-bottom: .25em;
}
</style>