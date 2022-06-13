<template>
    <div class="modal fade" id="operatorEdit" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>Alterando {{ selected['Nome Fantasia'] || selected['Razao Social'] }} </b></h5>
                    <button id="closeModalButtonEdit" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form v-on:submit.prevent="validateForm" class="needs-validation" novalidate id="editForm">
                        <div class="form-group">
                            <label for="razao-social">Razão Social*</label>
                            <input required type="text" class="form-control" id="razao-social" placeholder="Operadora XYZ S.A." v-model="selected['Razao Social']">
                        </div>
                        <div class="form-group">
                            <label for="nome-fantasia">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nome-fantasia" placeholder="XYZ Saúde" v-model="selected['Nome Fantasia']">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="modalidade">Modalidade*</label>
                                <select required id="modalidade" class="form-control" v-model="selected['Modalidade']">
                                    <option selected value="">Selecionar...</option>
                                    <option v-for="modalidade in modalidadesArray">{{ modalidade }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="cnpj">CNPJ*</label>
                                <input required type="number" class="form-control" id="cnpj" placeholder="Somente números" v-model="selected['CNPJ']">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="registro-ans">Registro ANS*</label>
                                <input required type="number" class="form-control" id="registro-ans" placeholder="" v-model="selected['Registro ANS']">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="data">Data de registro ANS*</label>
                                <input required type="date" class="form-control" id="data" placeholder="" v-model="selected['Data Registro ANS']">
                            </div>
                        </div>

                        <hr>

                        <div class="form-row">
                            <div class="form-group col-md-10">
                                <label for="logradouro">Logradouro*</label>
                                <input required type="text" class="form-control" id="logradouro" placeholder="Av. Paulista" v-model="selected['Logradouro']">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="numero">Número*</label>
                                <input required type="number" class="form-control" id="numero" placeholder="" v-model="selected['Numero']">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="complemento">Complemento</label>
                            <input type="text" class="form-control" id="complemento" v-model="selected['Complemento']">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-5">
                                <label for="bairro">Bairro*</label>
                                <input required type="text" class="form-control" id="bairro" v-model="selected['Bairro']">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="cidade">Cidade*</label>
                                <input required type="text" class="form-control" id="cidade" v-model="selected['Cidade']">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="uf">UF*</label>
                                <select required id="uf" class="form-control" v-model="selected['UF']">
                                    <option selected value="">...</option>
                                    <option v-for="uf in ufArray">{{ uf }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="cep">CEP*</label>
                                <input required type="text" class="form-control" id="cep" v-model="selected['CEP']">
                            </div>
                        </div>

                        <hr />

                        <div class="form-row">
                            <div class="form-group col-md-7">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="email" v-model="selected['Endereco eletronico']">
                            </div>
                            <div class="form-group col-md-1">
                                <label for="ddd">DDD</label>
                                <input type="number" class="form-control" id="ddd" v-model="selected['DDD']">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="telefone">Telefone</label>
                                <input type="number" class="form-control" id="telefone" v-model="selected['Telefone']">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="fax">Fax</label>
                                <input type="number" class="form-control" id="fax" v-model="selected['Fax']">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="representante">Nome do representante*</label>
                                <input required type="text" class="form-control" id="representante" v-model="selected['Representante']">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="cargo">Cargo*</label>
                                <input required type="text" class="form-control" id="cargo" v-model="selected['Cargo Representante']">
                            </div>
                        </div>

                        <div class="text-right">
                            <button class="btn btn-primary" type="submit" @click="validateForm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                                </svg>
                                Salvar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ufArray, modalidadesArray, createEntryObject, parseCNPJ } from '../../utils';

export default {
    name: 'EditModal',

    props: ['selected'],

    emits: ['updated'],

    methods: {
        validateForm(event) {
            if (!event.target.elements) return;

            if (!event.target.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                event.target.classList.add('was-validated');
            }
            else {
                this.sendToDatabase(event);
            }
        },

        sendToDatabase(event) {
            const parameters = createEntryObject(event.target.elements);

            fetch('https://pablofsc-interface-ic.herokuapp.com/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'registrationNumber': this.selected['Registro Original'],
                    ...parameters
                })
            })
                .then(res => {
                    this.selected['CNPJ'] = parseCNPJ(this.selected['CNPJ']);

                    $('#closeModalButtonEdit').click();
                    this.$emit('updated');
                })
                .catch(e => console.log(e));
        }
    },

    data() {
        return {
            ufArray,
            modalidadesArray
        };
    }
};
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: right;
}

@media (max-width: 1000px) {
    .modal-lg {
        max-width: 90% !important;
    }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>