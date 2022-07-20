<template>
    <div class="modal fade" id="restoreModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><b>Restaurar banco de dados?</b></h5>
                </div>

                <div class="modal-body">
                    <p>
                        Tem certeza que deseja restaurar o banco de dados para os dados originais da ANS?
                    </p>
                    <p>
                        <b>Todas as modificações feitas à lista serão perdidas.</b>
                    </p>
                    <p>
                        Esta ação não pode ser desfeita.
                    </p>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-danger" @click="restore">
                        <BIconArrowCounterclockwise />
                        Restaurar
                    </button>

                    <button id="closeModalButtonFilter" type="button" class="btn btn-dark" data-dismiss="modal" aria-label="Close" @click="saveFilters">
                        <BIconXLg />
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dbURL } from '../../utils';
import { BIconArrowCounterclockwise, BIconXLg } from 'bootstrap-icons-vue';

export default {
    name: 'RestoreModal',

    components: {
        BIconArrowCounterclockwise,
        BIconXLg
    },

    methods: {
        restore() {
            fetch(dbURL + '/restore', { method: 'PUT' })
                .then(response => location.reload())
                .catch(error => console.log('error', error));
        }
    },
};
</script>

<style scoped>
.modal-body {
    padding-bottom: 0;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
}
</style>
