<template>
    <Modal small id="filterModal" title="Filtrar lista de operadoras">
        <form v-on:submit.prevent="close" id="filterForm">
            <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="modalidade">Modalidade</label>
                    <select id="modalidade" class="form-control" v-model="filters['Modalidade']">
                        <option selected value="">todas</option>
                        <option v-for="modalidade in modalidadesArray" :key="modalidade">
                            {{ modalidade }}
                        </option>
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <label for="uf">UF</label>
                    <select id="uf" class="form-control" v-model="filters['UF']">
                        <option selected value="">todas</option>
                        <option v-for="uf in ufArray" :key="uf">
                            {{ uf }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="data">Registrado na ANS após </label>
                    <input type="date" class="form-control" v-model="filters['registeredAfter']">
                </div>

                <div class="form-group col-md-6">
                    <label for="data">Registrado na ANS até </label>
                    <input type="date" class="form-control" v-model="filters['registeredBefore']">
                </div>
            </div>
        </form>

        <hr />

        <div class="d-flex justify-content-between">
            <button class="btn btn-danger" @click="clear">
                <BIconTrashFill />
                Limpar
            </button>

            <button id="closeModalButtonFilter" class="btn btn-dark" data-dismiss="modal">
                <BIconFunnel />
                OK
            </button>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import { ufArray, modalidadesArray } from '../../utils';
import { BIconTrashFill, BIconFunnel } from 'bootstrap-icons-vue';

export default {
    name: 'FilterModal',

    props: ['filters'],

    components: {
        Modal,
        BIconTrashFill,
        BIconFunnel,
    },

    methods: {
        close() {
            $('#closeModalButtonFilter').click();
        },

        clear() {
            $('#filterForm').trigger('reset');
            Object.keys(this.filters).forEach(k => this.filters[k] = '');
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
