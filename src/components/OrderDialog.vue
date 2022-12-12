<template>
    <Dialog class=".order-dialog" :header="header" v-model:visible="state.open" :maximizable="true" :modal="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" @hide="$emit('close')">
        <div class="order__status__wrapper">
            <label>Status</label>
            <Dropdown v-model="state.edit.status" :options="statusOptions" placeholder="Any"
                class="p-column-filter" style="width: 10em">
                <template #value="slotProps">
                    <div style="margin: .5em 0em">
                        <span :class="'status-badge status-badge--' + trimStatus(slotProps.value)">
                            {{ trimStatus(slotProps.value) }}</span>
                    </div>
                </template>
                <template #option="slotProps">
                    <div style="margin: .5em 0em">
                        <span :class="'status-badge status-badge--' + trimStatus(slotProps.option)">{{
                                trimStatus(slotProps.option)
                        }}</span>
                    </div>
                </template>
            </Dropdown>
        </div>
        <div class="lineup">
            <h2>Bestelling</h2>
            <button v-if="!state.editMode" :onClick="startEdit" class="button button--warning button--subtle"><i class="pi pi-pencil"/> Edit</button>
            <button v-else :onClick="undoEdit" class="button button--error button--subtle"><i class="pi pi-undo"/> Undo</button>
        </div>
        
        <Inplace :disabled="!state.editMode" :active="state.editMode">
            <template #display>
                <div class="order__content">
                    <span>
                        <label>Levertijd</label>
                        <div>{{ formatDate(state.order.dateBy) }}</div>
                    </span>
                    <span>
                        <label>Hoeveelheid</label>
                        <div>{{ state.order.count }}</div>
                    </span>
                </div>
                <h2>Informatie Klant</h2>
                <div class="order__content">
                    <span>
                        <label>Bedrijf</label>
                        <div> {{ state.order.customer.company}}</div>
                    </span>
                    <span>
                        <label>Naam</label>
                        <div> {{ state.order.customer.fullName}}</div>
                    </span>
                    <span>
                        <label>Telefoonnummer</label>
                        <div> {{ state.order.customer.phone}}</div>
                    </span>
                    <span>
                        <label>Email</label>
                        <div> {{ state.order.customer.email}}</div>
                    </span>
                    <span>
                        <label>Lever Adres</label>
                        <div> {{ state.order.address}}</div>
                    </span>
                    <span>
                        <label>Factuuradres</label>
                        <div> {{ state.order.customer.billingAddress}}</div>
                    </span>
                </div>
            </template>
            <template #content>
                <div class="order__content">
                    <span>
                        <label>Levertijd</label>
                        <Calendar :showTime="true" v-model="state.edit.dateBy" />
                    </span>
                    <span>
                        <label>Hoeveelheid</label>
                        <NumberInput v-model="state.edit.count" />
                    </span>
                </div>
                <h2>Informatie Klant</h2>
                <div class="order__content">
                    <span>
                        <label>Bedrijf</label>
                        <TextInput v-model="state.edit.customer.company" autoFocus />
                    </span>
                    <span>
                        <label>Naam</label>
                        <TextInput v-model="state.edit.customer.fullName" autoFocus />
                    </span>
                    <span>
                        <label>Telefoonnummer</label>
                        <TextInput v-model="state.edit.customer.phone" autoFocus />
                    </span>
                    <span>
                        <label>Email</label>
                        <TextInput v-model="state.edit.customer.email" autoFocus />
                    </span>
                    <span>
                        <label>Lever Adres</label>
                        <TextInput v-model="state.edit.address" autoFocus />
                    </span>
                    <span>
                        <label>Factuuradres</label>
                        <TextInput v-model="state.edit.customer.billingAddress" autoFocus />
                    </span>
                </div>
            </template>
        </Inplace>
        <template #footer>
            <button v-if="state.editMode" :onClick="cancelEdit" class="button button--error button--subtle">Close</button>
            <button v-if="state.editMode" :onClick="saveChanges" class="button button--success">Save</button>
        </template>
    </Dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits, reactive, watch, onMounted } from 'vue';
import { trimStatus, statusOptions } from '../js/trimStatus';
import { formatDate } from '../js/formatDate';
import { putOrder } from '../api/order';

const props = defineProps({
    order: Object,
    open: Boolean
});

const state = reactive({
    open: props.open,
    order: props.order,
    edit: props.order,
    editMode: false
});
const emits = defineEmits(['close', 'update']);

watch(() => props.open, (current) => state.open = current);
watch(() => props.order, (current) => {
    state.order = current;
    state.edit = Object.assign({}, current);
});

const header = computed(() => {
    const customer = state?.order?.customer?.company || state?.order?.customer?.fullName || "";
    return `Bestelling ${customer}`;
})

const hasChanges = computed(() => {
    return state.edit !== state.order || state.edit.customer !== state.order.customer;
})

const startEdit = () => {
    state.edit = Object.assign({}, state.order);
    state.editMode = true;
}

const undoEdit = () => {
    state.edit = Object.assign({}, state.order);
}

const cancelEdit = () => {
    state.edit = Object.assign({}, state.order);
    state.editMode = false;
}

const saveChanges = () => {
    const result = putOrder(state.edit);
    if (result) {
        state.order = Object.assign({}, state.edit);
        $emit('update', state.order);
        state.editMode = false;
    }
}
</script>

<style scoped>
.order__status__wrapper {
    display: flex;
    flex-direction: column;
}

.order__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
}

label {
    font-weight: 600;
}

h2 {
    margin: .75em 0 0.25em 0;
}

.lineup {
    display: flex;
    justify-content: space-between;
}

.lineup h2 {
    width: fit-content;
}

.lineup .button {
    margin-top: auto;
    margin-bottom: 0px;
}

.order__content span {
    display: flex;
    flex-direction: column;
}
</style>
<style>
.order-dialog .p-inplace {
    margin: .5em 0;
}

.order-dialog .p-inplace-display {
    width: 100%;
}

.p-inplace-display.p-disabled {
    opacity: 1!important;
}

.order__content .p-calendar .p-inputtext,
.order__content .p-inputnumber .p-inputtext {
    width: auto;
}
</style>