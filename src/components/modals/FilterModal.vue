<template>
    <div class="modal fade" id="filterModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>Filtrar lista de operadoras</b></h5>
                </div>

                <div class="modal-body">
                    <form v-on:submit.prevent="saveFilters" class="needs-validation" novalidate id="filterForm">
                        <div class="form-row">
                            <div class="form-group col-md-8">
                                <label for="modalidade">Modalidade</label>
                                <select required id="modalidade" class="form-control" v-model="filters['Modalidade']">
                                    <option selected value="">todas</option>
                                    <option v-for="modalidade in modalidadesArray">{{ modalidade }}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="uf">UF</label>
                                <select required id="uf" class="form-control" v-model="filters['UF']">
                                    <option selected value="">todas</option>
                                    <option v-for="uf in ufArray">{{ uf }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="data">Registrado na ANS após </label>
                                <input required type="date" class="form-control" id="data" placeholder="" v-model="filters['registeredAfter']">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="data">Registrado na ANS até </label>
                                <input required type="date" class="form-control" id="data" placeholder="" v-model="filters['registeredBefore']">
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-danger" @click="clearFilters">
                        <BIconTrashFill />
                        Limpar
                    </button>

                    <button id="closeModalButtonFilter" type="button" class="btn btn-dark" data-dismiss="modal" aria-label="Close" @click="saveFilters">
                        <BIconFunnel />
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ufArray, modalidadesArray } from '../../utils';
import { BIconTrashFill, BIconFunnel } from 'bootstrap-icons-vue';

export default {
    name: 'FilterModal',

    props: ['filters'],

    components: {
        BIconTrashFill,
        BIconFunnel
    },

    methods: {
        saveFilters() {
            $('#closeModalButtonFilter').click();
        },

        clearFilters() {
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

<style scoped>
.modal-footer {
    display: flex;
    justify-content: space-between;
}
</style>
