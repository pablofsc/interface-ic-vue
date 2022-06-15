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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                        Restaurar
                    </button>

                    <button id="closeModalButtonFilter" type="button" class="btn btn-dark" data-dismiss="modal" aria-label="Close" @click="saveFilters">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RestorerModal',

    emits: ['restored'],

    methods: {
        restore() {
            fetch("https://pablofsc-interface-ic.herokuapp.com/restore", { method: 'PUT' })
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