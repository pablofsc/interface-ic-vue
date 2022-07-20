<template>
    <div class="btn-group" id="sortButton">
        <button id="switchDescends" type="button" class="btn btn-dark" @click="invertOrder">
            <BIconSortDownAlt v-if="descending" />
            <BIconSortUp v-else />
        </button>
        <button id="filtersDropdown" type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>

        <div class="dropdown-menu shadow">
            <span class="dropdown-item-text text-center">
                Ordenar por
            </span>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" v-bind:class="{ active: selected === property }" v-for="property in options" @click="sort">
                {{ property }}
            </button>
        </div>
    </div>
</template>

<script>
import { BIconSortDownAlt, BIconSortUp } from 'bootstrap-icons-vue';

export default {
    name: 'SortBy',

    props: ['list'],

    emits: ['sorting-selected'],

    components: {
        BIconSortDownAlt,
        BIconSortUp
    },

    methods: {
        sort(event) {
            this.selected = event.target.innerHTML;
            this.emitChange();
        },
        invertOrder() {
            this.descending = !this.descending;
            this.emitChange();
        },
        emitChange() {
            this.$emit('sorting-selected', this.selected, this.descending);
        }
    },

    data() {
        return {
            options: [
                'Registro ANS',
                'Razao Social',
                'Nome Fantasia',
                'Data Registro ANS',
                'Representante',
                'Cidade'
            ],
            selected: 'Registro ANS',
            descending: true,
        };
    }
};
</script>

<style scoped>
button:active {
    outline: none;
    background-color: #343a40;
}

.active {
    background-color: #343a40;
}
</style>
