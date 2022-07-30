<template>
    <Modal id="operatorAdd" title="Adicionar nova operadora">
        <OperatorForm :submitFunction="sendToDatabase" submitText="Cadastrar" />
    </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import OperatorForm from "../OperatorForm.vue";
import { createEntryObject, dbURL, } from "../../utils";

export default {
    name: "AddModal",

    emits: ["created"],

    components: {
        Modal,
        OperatorForm
    },

    methods: {
        sendToDatabase(event) {
            const parameters = createEntryObject(event.target.elements);

            fetch(dbURL + "/insert", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parameters),
            })
                .then(() => {
                    $("#operatorAdd-close").click();
                    $("#addForm").trigger("reset");
                    this.$emit("created", parameters);
                })
                .catch((e) => console.log(e));
        },
    }
};
</script>
