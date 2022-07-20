<template>
    <div v-if="operators" class="container">
        <div class="topBarParent">
            <div class="topBar shadow-lg p-3">
                <p style="font-size: 20px;">{{ filteredOperators.length }} operadoras ativas ANS</p>
                <div class="filler"></div>

                <SortBy :list="operators" @sorting-selected="handleSort" />

                <button id="filterButton" type="button" class="btn btn-dark" data-toggle="modal" data-target="#filterModal">
                    <BIconFunnel />
                </button>

                <button id="addOperatorButton" type="button" class="btn btn-dark" data-toggle="modal" data-target="#operatorAdd">
                    <BIconPlusLg />
                    <p class="hide-on-mobile">&#160; Adicionar</p>
                </button>

                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Pesquisar..." v-model="searchString">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">
                            <BIconSearch />
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
                <BIconArrowCounterclockwise />
                RESTAURAR BANCO DE DADOS
            </button>
        </div>
    </div>
    <div v-else class="text-center">
        Carregando dados...
    </div>

    <div class="d-flex my-4 justify-content-center">
        <p>Este site é apenas uma prova de conceito, não tem relação com a ANS e os dados podem estar errados ou desatualizados.</p>
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

import { BIconFunnel, BIconPlusLg, BIconSearch, BIconArrowCounterclockwise } from 'bootstrap-icons-vue';

import { dbURL, parseCNPJ } from '../utils';

export default {
    name: 'OperatorTable',

    components: {
        DetailsModal,
        AddModal,
        FilterModal,
        SortBy,
        RestoreModal,

        BIconFunnel,
        BIconPlusLg,
        BIconSearch,
        BIconArrowCounterclockwise
    },

    data() {
        let operators = ref(null);

        fetch(dbURL + '/table', { method: 'GET' })
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
