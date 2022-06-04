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
body {
    background-color: #f1f1f1;
}

svg {
    margin-right: 5px;
    position: relative;
    bottom: 2px;
}

@media (max-width: 1000px) {
    svg {
        margin: 0;
    }
}
</style>