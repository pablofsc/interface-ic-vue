<template>

    <div class="text-center topImage shadow">
        <img src="../assets/ic.png" style="" />
    </div>

    <div class="container">
        <div class="topBar shadow-lg p-3">
            <p style="font-size: 20px;">Relação de operadoras ativas ANS</p>

            <div class="input-group">
                <input type="text" class="form-control" placeholder="Pesquisar..." v-model="search">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <table id="operator-table" class="table table-striped table-bordered shadow">
            <tbody>
                <tr v-for="operator in operators" :key="operator.id">
                    <td>
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
    </div>
</template>

<script>
import { ref } from 'vue';

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
                });

                operators.value = table;
            });

        return {
            operators
        };
    },
};
</script>

<style focused>
* {
    font-family: 'Montserrat', sans-serif;
}

body {
    background-color: #f1f1f1;
}

.input-group {
    width: 45%;
}

.topImage {
    width: 100%;
    margin-bottom: 50px;
    background-color: #ffffff;
}

img {
    object-fit: cover;
    width: 300px;
    height: 125px;
}

td {
    font-size: 14px;
}

p {
    margin: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.topBar {
    top: 30px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    align-items: center;
    position: sticky;
    width: 90%;
    margin-bottom: 50px;
    border-radius: 10px;
}

table {
    border: 1px black;
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