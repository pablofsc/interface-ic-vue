<template>
    <Modal id="operatorEdit" :onClose="close" :title="'Alterando ' + (selected['Nome Fantasia'] || selected['Razao Social'])">
        <OperatorForm :operator="selected" :submitFunction="sendToDatabase" submitText="Salvar alterações" />
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import OperatorForm from '../OperatorForm.vue';
import { ufArray, modalidadesArray, createEntryObject, parseCNPJ, dbURL } from '../../utils';

export default {
    name: 'EditModal',

    props: ['selected'],

    components: {
        Modal,
        OperatorForm
    },

    methods: {
        sendToDatabase(event) {
            const parameters = createEntryObject(event.target.elements);

            fetch(dbURL + '/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'registrationNumber': this.selected['Registro Original'],
                    ...parameters
                })
            })
                .then(() => {
                    $('#operatorEdit-close').click();
                    this.selected['CNPJ'] = parseCNPJ(this.selected['CNPJ']);
                })
                .catch(e => console.log(e));
        },

        close() {
            this.selected['CNPJ'] = parseCNPJ(this.selected['CNPJ']);
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
