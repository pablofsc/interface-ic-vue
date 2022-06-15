<template>
    <div v-if="operators" class="container">
        <div class="topBarParent">
            <div class="topBar shadow-lg p-3">
                <p style="font-size: 20px;">{{ filteredOperators.length }} operadoras ativas ANS</p>
                <div class="filler"></div>

                <SortBy :list="operators" @sorting-selected="handleSort" />

                <button id="filterButton" type="button" class="btn btn-dark" data-toggle="modal" data-target="#filterModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                    </svg>
                </button>

                <button id="addOperatorButton" type="button" class="btn btn-dark" data-toggle="modal" data-target="#operatorAdd">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                    <p class="hide-on-mobile">&#160; Adicionar</p>
                </button>

                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Pesquisar..." v-model="searchString">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <table v-if="filteredOperators.length > 0" id="operator-table" class="table table-bordered shadow">
            <tbody>
                <tr v-for="operator in filteredOperators" :key="operator" data-toggle="modal" data-target="#operatorInfo">
                    <td @click="selectedOperator = operator">
                        <div class="operatorDetails">
                            <p class="left">
                            <p>
                                <b style="font-size: 15px">{{ operator['Nome Fantasia'] || operator['Razao Social'] }} </b>
                            </p>
                            CNPJ {{ operator['CNPJ'] }} - Registro ANS {{ operator['Registro ANS'] }}
                            </p>
                            <p class="right">
                                {{ operator['Modalidade'] }}
                                <i>sede em {{ operator['Bairro'] }}, {{ operator['Cidade'] }} - {{ operator['UF'] }}</i>
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center">
            Não há operadoras com estas características.
        </div>

        <div class="d-flex my-5 justify-content-center">
            <button class="btn btn-danger" @click="restoreToDefaults" data-toggle="modal" data-target="#restoreModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
                RESTAURAR BANCO DE DADOS
            </button>
        </div>
    </div>
    <div v-else class="text-center">
        Carregando dados...
    </div>


    <DetailsModal :selected="selectedOperator" @deleted="handleDeletion" />
    <AddModal @created="handleCreation" />
    <FilterModal :filters="filters" />
    <RestoreModal />
</template>

<script>
import { ref } from 'vue';
import DetailsModal from './modals/DetailsModal.vue';
import AddModal from './modals/AddModal.vue';
import FilterModal from './modals/FilterModal.vue';
import RestoreModal from './modals/RestoreModal.vue';
import SortBy from './SortBy.vue';
import { parseCNPJ } from '../utils';

export default {
    name: 'OperatorTable',

    components: {
        DetailsModal,
        AddModal,
        FilterModal,
        SortBy,
        RestoreModal
    },

    data() {
        let operators = ref(null);

        fetch('https://pablofsc-interface-ic.herokuapp.com/table', { method: 'GET' })
            .then(res => res.json())
            .then(table => {
                table.map(item => {
                    item['CNPJ'] = parseCNPJ(item['CNPJ']);

                    item['Data Registro ANS'] = item['Data Registro ANS']
                        .slice(0, 10);

                    item['Parsed Date'] = item['Data Registro ANS']
                        .split("-")
                        .reverse()
                        .join("/");
                });

                operators.value = table;
            });

        return {
            operators,
            searchString: '',
            selectedOperator: '',
            filters: {
                Modalidade: '',
                UF: '',
                registeredAfter: '',
                registeredBefore: ''
            },
            sortBy: 'Registro ANS',
            sortOrderDescends: true
        };
    },

    computed: {
        filteredOperators() {
            let sorted = this.operators;

            this.sortBy != 'Registro ANS'
                ? $('#filtersDropdown').removeClass('btn-dark').addClass('btn-warning')
                : $('#filtersDropdown').removeClass('btn-warning').addClass('btn-dark');

            !this.sortOrderDescends
                ? $('#switchDescends').removeClass('btn-dark').addClass('btn-warning')
                : $('#switchDescends').removeClass('btn-warning').addClass('btn-dark');

            this.sortOrderDescends
                ? sorted.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : ((b[this.sortBy] > a[this.sortBy]) ? -1 : 0))
                : sorted.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? -1 : ((b[this.sortBy] > a[this.sortBy]) ? 1 : 0));
            let filtered = sorted;

            if (Object.values(this.filters).some(x => x !== '')) {
                $('#filterButton').removeClass('btn-dark').addClass('btn-warning');
                filtered = filtered.filter(operator =>
                    (this.filters.Modalidade
                        ? this.filters.Modalidade === operator.Modalidade
                        : true)
                    &&
                    (this.filters.UF
                        ? this.filters.UF === operator.UF
                        : true)
                    &&
                    (this.filters.registeredAfter
                        ? this.filters.registeredAfter <= operator['Data Registro ANS']
                        : true
                    )
                    &&
                    (this.filters.registeredBefore
                        ? this.filters.registeredBefore >= operator['Data Registro ANS']
                        : true
                    )
                );
            }
            else
                $('#filterButton').removeClass('btn-warning').addClass('btn-dark');

            return this.searchString === '' || this.searchString.length < 2
                ? filtered
                : filtered.filter(operator => Object.values(operator).join("").toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1);
        },
    },

    methods: {
        handleCreation(newObject) {
            if (newObject) {
                newObject['CNPJ'] = parseCNPJ(newObject['CNPJ']);

                const index = this.operators.findIndex(i => i['Registro ANS'] > newObject['Registro ANS']);
                this.operators.splice(index, 0, newObject);
            }
        },

        handleDeletion() {
            this.operators.splice(this.operators.findIndex(i => i['Registro ANS'] === this.selectedOperator['Registro ANS']), 1);
        },

        handleSort(selected, order) {
            this.sortBy = selected;
            this.sortOrderDescends = order;
        }
    }
};
</script>

<style scoped>
.input-group {
    width: 30%;
}

td {
    font-size: 14px;
}

tr:nth-of-type(2n - 1) {
    background-color: #f1f1f1;
}

tr:nth-of-type(2n) {
    background-color: #e5e5e5;
}

tr {
    transition: all .3s ease-in-out;
}

tr:hover {
    transform: scale(1.025);
    transition: all .1s ease-in-out;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    cursor: pointer;
}

p {
    margin: 0;
    display: inline
}

.topBarParent {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: sticky;
    top: 0px;
    z-index: 999;

    width: 100%;
    padding: 50px 5% 70px 5%;
}

.topBar {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    align-items: center;

    width: 90%;
    border-radius: 10px;
}

#sortButton {
    margin: 0 10px;
}

#addOperatorButton {
    margin: 0 10px;
}

.operatorDetails {
    width: 100%;
    display: flex;
    justify-content: space-between !important;
}

.left {
    display: flex;
    flex-direction: column;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.filler {
    flex-grow: 1;
}

@media (max-width: 1000px) {
    .topBar {
        width: 100%;
    }

    .hide-on-mobile {
        display: none
    }
}
</style>