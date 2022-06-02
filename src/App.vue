<template>
    <OperatorTable />
</template>

<script>
import OperatorTable from './components/OperatorTable.vue';

export default {
    name: "App",

    components: {
        OperatorTable,
    },
};
</script>

<style scoped>
body {
    background-color: #f1f1f1;
}
</style>