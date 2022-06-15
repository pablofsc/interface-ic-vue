<template>
    <div class="btn-group" id="sortButton">
        <button id="switchDescends" type="button" class="btn btn-dark" @click="invertOrder">
            <svg v-if="descending" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
            </svg>
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
export default {
    name: 'SortBy',

    props: ['list'],

    emits: ['sorting-selected'],

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