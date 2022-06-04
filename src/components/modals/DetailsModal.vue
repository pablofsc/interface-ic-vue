<template>
    <div class="modal fade" id="operatorInfo" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>{{ selected['Nome Fantasia'] || selected['Razao Social'] }}</b></h5>
                    <button id="closeModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <p> <i> Razão Social: </i> {{ selected['Razao Social'] }} </p>
                    <p> <i> Nome Fantasia: </i> {{ selected['Nome Fantasia'] || 'não possui' }} </p>
                    <p> <i> CPNJ: </i> {{ selected['CNPJ'] }} </p>
                    <hr>
                    <p> <i> Registro ANS: </i> {{ selected['Registro ANS'] }} (registro em {{ selected['Data Registro ANS'] }}) </p>
                    <p> <i> Modalidade: </i> {{ selected['Modalidade'] }}</p>
                    <p> <i> Representante: </i> {{ selected['Representante'] }} </p>
                    <p> <i> </i> {{ selected['Cargo Representante'] }} </p>
                    <hr>
                    <p> <i> Telefone: </i> {{
                            selected['Telefone']
                                ? '(' + selected['DDD'] + ') ' + selected['Telefone']
                                : 'não possui'
                    }} </p>
                    <p> <i> E-mail: </i> {{ selected['Endereco eletronico'] || 'não possui' }}</p>
                    <p> <i> Endereço: </i> {{ selected['Logradouro'] }}, número {{ selected['Numero'] }}{{ selected['Complemento'] ? ', ' + selected['Complemento'] : '' }} </p>
                    <p> <i></i> {{ selected['Bairro'] }}, {{ selected['Cidade'] }}, {{ selected['UF'] }}, CEP {{ selected['CEP'] }} </p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="deleteEntry(selected)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                        Excluir
                    </button>
                    <button type="button" class="btn btn-primary" @click="editEntry(selected)" data-toggle="modal" data-target="#operatorEdit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <EditModal :selected="selected" @updated="handleChange" />
</template>

<script>
import EditModal from './EditModal.vue';

export default {
    name: 'DetailsModal',

    props: ['selected'],

    emits: ['changed'],

    components: {
        EditModal
    },

    methods: {
        deleteEntry(entry) {
            fetch('https://pablofsc-interface-ic.herokuapp.com/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationNumber: entry['Registro ANS'] })
            })
                .then(res => {
                    console.log(res);
                    $('#closeModalButton').click();
                    this.$emit('changed');
                })
                .catch(e => console.log(e));
        },

        editEntry() {
            this.selected['CNPJ'] = this.selected['CNPJ'].replace(/\D/g, '');

            let date = new Date(this.selected['Data Registro ANS']);
            date = date.toISOString().slice(0, 10);

            this.selected['Data Registro ANS'] = date.toString();

            this.selected['Registro Original'] = this.selected['Registro ANS'];

            $('#closeModalButton').click();
        },

        handleChange(action) {
            this.$emit('changed');
        }
    }
};
</script>

<style scoped>
p {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
}
</style>