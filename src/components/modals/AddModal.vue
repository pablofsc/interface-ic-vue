<template>
    <div class="modal fade" id="operatorAdd" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>Adicionar nova operadora</b></h5>
                    <button id="closeModalButtonAdd" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form v-on:submit.prevent class="needs-validation" novalidate>
                        <div class="form-group">
                            <label for="razao-social">Razão Social*</label>
                            <input required type="text" class="form-control" id="razao-social" placeholder="Operadora XYZ S.A.">
                        </div>
                        <div class="form-group">
                            <label for="nome-fantasia">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nome-fantasia" placeholder="XYZ Saúde">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="modalidade">Modalidade*</label>
                                <select required id="modalidade" class="form-control">
                                    <option selected value="">Selecionar...</option>
                                    <option v-for="modalidade in modalidadesArray">{{ modalidade }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="cnpj">CPNJ*</label>
                                <input required type="number" class="form-control" id="cnpj" placeholder="Somente números">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="registro-ans">Registro ANS*</label>
                                <input required type="number" class="form-control" id="registro-ans" placeholder="">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="data">Data de registro ANS*</label>
                                <input required type="date" class="form-control" id="data" placeholder="">
                            </div>
                        </div>

                        <hr>

                        <div class="form-row">
                            <div class="form-group col-md-10">
                                <label for="logradouro">Logradouro*</label>
                                <input required type="text" class="form-control" id="logradouro" placeholder="Av. Paulista">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="numero">Número*</label>
                                <input required type="number" class="form-control" id="numero" placeholder="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="complemento">Complemento</label>
                            <input type="text" class="form-control" id="complemento" placeholder="Edifício Ipanema">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-5">
                                <label for="bairro">Bairro*</label>
                                <input required type="text" class="form-control" id="bairro">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="cidade">Cidade*</label>
                                <input required type="text" class="form-control" id="cidade">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="uf">UF*</label>
                                <select required id="uf" class="form-control">
                                    <option selected value="">...</option>
                                    <option v-for="uf in ufArray">{{ uf }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="cep">CEP*</label>
                                <input required type="text" class="form-control" id="cep">
                            </div>
                        </div>

                        <hr />

                        <div class="form-row">
                            <div class="form-group col-md-7">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="email">
                            </div>
                            <div class="form-group col-md-1">
                                <label for="ddd">DDD</label>
                                <input type="number" class="form-control" id="ddd">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="telefone">Telefone</label>
                                <input type="number" class="form-control" id="telefone">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="fax">Fax</label>
                                <input type="number" class="form-control" id="fax">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="representante">Nome do representante*</label>
                                <input required type="text" class="form-control" id="representante">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="cargo">Cargo*</label>
                                <input required type="text" class="form-control" id="cargo">
                            </div>
                        </div>

                        <div class="text-right">
                            <button class="btn btn-primary" type="submit" @click="validateForm">Submit form</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ufArray, modalidadesArray, createEntryObject } from '../../utils';

export default {
    name: 'AddModal',

    props: ['selected'],

    methods: {
        validateForm() {
            var form = document.querySelector('.needs-validation');

            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                }
                else {
                    this.sendToDatabase(event);
                }
            }, false);
        },

        sendToDatabase(event) {
            const parameters = createEntryObject(event.target.elements);

            fetch('https://pablofsc-interface-ic.herokuapp.com/insert', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parameters)
            })
                .then(res => {
                    $('#closeModalButtonAdd').click();
                    this.$emit('created');
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