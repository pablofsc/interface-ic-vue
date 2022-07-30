<template>
    <Modal small id="restoreModal" title="Restaurar banco de dados?">
        <p> Tem certeza que deseja restaurar o banco de dados para os dados originais da ANS? </p>
        <p> <b>Todas as modificações feitas à lista serão perdidas.</b> </p>
        <p> Esta ação não pode ser desfeita. </p>

        <hr />

        <div class="d-flex justify-content-between">
            <button class="btn btn-danger" @click="restore">
                <BIconArrowCounterclockwise />
                Restaurar tabela
            </button>

            <button class="btn btn-dark" data-dismiss="modal">
                <BIconXLg />
                Cancelar
            </button>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import { dbURL } from '../../utils';
import { BIconArrowCounterclockwise, BIconXLg } from 'bootstrap-icons-vue';

export default {
    name: 'RestoreModal',

    components: {
        Modal,
        BIconArrowCounterclockwise,
        BIconXLg,
    },

    methods: {
        restore() {
            fetch(dbURL + '/restore', { method: 'PUT' })
                .then(() => location.reload())
                .catch(error => console.log('error', error));
        }
    },
};
</script>
