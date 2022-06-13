<template>
    <div class="container">
        <div class="topBarParent">
            <div class="topBar shadow-lg p-3">
                <p style="font-size: 20px;">Operadoras ativas ANS</p>
                <div class="filler"></div>
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

        <table v-if="operators" id="operator-table" class="table table-bordered shadow">
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
            Carregando dados...
        </div>
    </div>

    <DetailsModal :selected="selectedOperator" @deleted="handleDeletion" />
    <AddModal @created="handleCreation" />
</template>

<script>
import { ref } from 'vue';
import DetailsModal from './modals/DetailsModal.vue';
import AddModal from './modals/AddModal.vue';
import { parseCNPJ } from '../utils';

export default {
    name: 'OperatorTable',

    components: {
        DetailsModal,
        AddModal
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
        };
    },

    computed: {
        filteredOperators() {
            const result = this.searchString === '' || this.searchString.length < 2
                ? this.operators
                : this.operators.filter(operator => {
                    return Object.values(operator).join("").toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
                });
            return result;
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
        }
    }
};
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}

.input-group {
    width: 35%;
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

#addOperatorButton {
    margin: 0 10px 0 0;
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