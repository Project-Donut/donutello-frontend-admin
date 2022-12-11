<template>
    <div>{{state.open}}</div>
</template>

<script setup>
import { defineProps, reactive, watch } from 'vue';
const props = defineProps({
    order: Object,
    open: Boolean
});
const state = reactive({
    open: props.open,
    order: props.order
});
watch(() => props.open, (current) => state.open = current);
watch(() => props.order, (current) => state.order = current);
</script>

<style scoped>

</style>