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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                        Limpar
                    </button>

                    <button id="closeModalButtonFilter" type="button" class="btn btn-dark" data-dismiss="modal" aria-label="Close" @click="saveFilters">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                        </svg>
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ufArray, modalidadesArray } from '../../utils';

export default {
    name: 'FilterModal',

    props: ['filters'],

    emits: ['filter-selected'],

    methods: {
        saveFilters() {
            $('#closeModalButtonFilter').click();
            this.$emit('filter-selected');
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