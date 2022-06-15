<template>
    <TopImage />
    <OperatorTable />
</template>

<script>
import OperatorTable from './components/OperatorTable.vue';
import TopImage from './components/TopImage.vue';

export default {
    name: "App",

    components: {
        OperatorTable,
        TopImage
    },
};
</script>

<style>
* {
    font-family: 'Montserrat', sans-serif;
}

body {
    background-color: #f1f1f1;
}
</style>