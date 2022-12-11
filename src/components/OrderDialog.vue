<template>
    <Dialog :header="header" v-model:visible="state.open" :maximizable="true" :modal="true" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}"
        @hide="$emit('close')" >
            <template #footer>
                <button disabled class="button button--success">Save</button>
            </template>        
    </Dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits, reactive, watch } from 'vue';

const props = defineProps({
    order: Object,
    open: Boolean
});
const state = reactive({
    open: props.open,
    order: props.order,
    edit: {}
});
const emits = defineEmits(['close']);
const header = computed(() => {
    const customer = state?.order?.customer?.company || state?.order?.customer?.fullName || "";
    return `Bestelling ${customer}`;
})

watch(() => props.open, (current) => state.open = current);
watch(() => props.order, (current) => state.order = current);
</script>

<style scoped>

</style>