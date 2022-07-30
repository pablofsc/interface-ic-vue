<template>
    <form :id="id" v-on:submit.prevent="validateForm" class="needs-validation" novalidate>
        <div class="form-group">
            <label for="razao-social">Razão Social*</label>
            <input v-model="targetOperator['Razao Social']" required class="form-control" id="razao-social" />
        </div>

        <div class="form-group">
            <label for="nome-fantasia">Nome Fantasia</label>
            <input v-model="targetOperator['Nome Fantasia']" class="form-control" id="nome-fantasia" />
        </div>

        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="modalidade">Modalidade*</label>
                <select v-model="targetOperator['Modalidade']" required id="modalidade" class="form-control">
                    <option selected value="">Selecionar...</option>
                    <option v-for="modalidade in modalidadesArray" :key="modalidade">
                        {{ modalidade }}
                    </option>
                </select>
            </div>

            <div class="form-group col-md-3">
                <label for="cnpj">CPNJ*</label>
                <input v-model="targetOperator['CNPJ']" required type="number" class="form-control" id="cnpj" placeholder="Somente números" />
            </div>

            <div class="form-group col-md-2">
                <label for="registro-ans">Registro ANS*</label>
                <input v-model="targetOperator['Registro ANS']" required type="number" class="form-control" id="registro-ans" />
            </div>

            <div class="form-group col-md-3">
                <label for="data">Data de registro ANS*</label>
                <input v-model="targetOperator['Data Registro ANS']" required type="date" class="form-control" id="data" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-10">
                <label for="logradouro">Logradouro*</label>
                <input v-model="targetOperator['Logradouro']" required class="form-control" id="logradouro" />
            </div>

            <div class="form-group col-md-2">
                <label for="numero">Número*</label>
                <input v-model="targetOperator['Numero']" required type="number" class="form-control" id="numero" />
            </div>
        </div>

        <div class="form-group">
            <label for="complemento">Complemento</label>
            <input v-model="targetOperator['Complemento']" class="form-control" id="complemento" />
        </div>

        <div class="form-row">
            <div class="form-group col-md-5">
                <label for="bairro">Bairro*</label>
                <input v-model="targetOperator['Bairro']" required class="form-control" id="bairro" />
            </div>

            <div class="form-group col-md-3">
                <label for="cidade">Cidade*</label>
                <input v-model="targetOperator['Cidade']" required class="form-control" id="cidade" />
            </div>

            <div class="form-group col-md-2">
                <label for="uf">UF*</label>
                <select v-model="targetOperator['UF']" required id="uf" class="form-control">
                    <option selected value="">...</option>
                    <option v-for="uf in ufArray" :key="uf">
                        {{ uf }}
                    </option>
                </select>
            </div>

            <div class="form-group col-md-2">
                <label for="cep">CEP*</label>
                <input v-model="targetOperator['CEP']" required class="form-control" id="cep" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-7">
                <label for="email">Email</label>
                <input v-model="targetOperator['Endereco eletronico']" class="form-control" id="email" />
            </div>

            <div class="form-group col-md-1">
                <label for="ddd">DDD</label>
                <input v-model="targetOperator['DDD']" type="number" class="form-control" id="ddd" />
            </div>

            <div class="form-group col-md-2">
                <label for="telefone">Telefone</label>
                <input v-model="targetOperator['Telefone']" type="number" class="form-control" id="telefone" />
            </div>

            <div class="form-group col-md-2">
                <label for="fax">Fax</label>
                <input v-model="targetOperator['Fax']" type="number" class="form-control" id="fax" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="representante">Nome do representante*</label>
                <input v-model="targetOperator['Representante']" required class="form-control" id="representante" />
            </div>

            <div class="form-group col-md-6">
                <label for="cargo">Cargo*</label>
                <input v-model="targetOperator['Cargo Representante']" required class="form-control" id="cargo" />
            </div>
        </div>

        <hr />

        <div class="text-right">
            <button class="btn btn-primary" type="submit" @click="validateForm">
                <BIconSave /> &#160; {{ submitText }}
            </button>
        </div>
    </form>
</template>

<script>
import { ufArray, modalidadesArray } from "../utils";
import { BIconSave } from "bootstrap-icons-vue";

export default {
    name: "OperatorForm",

    props: ["id", "submitFunction", "submitText", "operator"],

    emits: ["sent"],

    components: {
        BIconSave,
    },

    methods: {
        validateForm(event) {
            if (!event.target.elements)
                return;

            if (!event.target.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                event.target.classList.add("was-validated");
                return;
            }

            this.submitFunction(event);
        },
    },

    data() {
        return {
            ufArray,
            modalidadesArray,
        };
    },

    computed: {
        targetOperator() {
            return this.operator || {};
        }
    }
};
</script>
