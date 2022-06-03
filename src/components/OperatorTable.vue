<template>
    <div class="container">
        <div class="topBarParent">
            <div class="topBar shadow-lg p-3">
                <p style="font-size: 20px;">Operadoras ativas ANS</p>

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
                <tr v-for="operator in filteredOperators" :key="operator.id" data-toggle="modal" data-target="#operatorInfo">
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
        <p v-else>
            Carregando dados...
        </p>
    </div>

    <Modal :selected="selectedOperator" />
</template>

<script>
import { ref } from 'vue';
import Modal from './Modal.vue';

export default {
    name: 'OperatorTable',

    data() {
        let operators = ref(null);

        fetch('https://pablofsc-interface-ic.herokuapp.com/table', { method: 'GET' })
            .then(res => res.json())
            .then(table => {
                table.map(item => {
                    item['CNPJ'] = item['CNPJ']
                        .toString()
                        .padStart(14, '0')
                        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

                    item['Data Registro ANS'] = (new Date(item['Data Registro ANS']))
                        .toLocaleDateString();
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

    components: {
        Modal
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
}

.topBarParent {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: sticky;
    top: 0;

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
</style>