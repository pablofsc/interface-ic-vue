<template>
    <Modal id="operatorInfo" :title="selected['Nome Fantasia'] || selected['Razao Social']">
        <p> <i> Razão Social: </i> {{ selected["Razao Social"] }} </p>
        <p> <i> Nome Fantasia: </i> {{ selected["Nome Fantasia"] || "não possui" }} </p>
        <p> <i> CPNJ: </i> {{ selected["CNPJ"] }} </p>

        <hr />

        <p> <i> Registro ANS: </i> {{ selected["Registro ANS"] }} (registro em {{ selected["Parsed Date"] }}) </p>
        <p> <i> Modalidade: </i> {{ selected["Modalidade"] }} </p>
        <p> <i> Representante: </i> {{ selected["Representante"] }} </p>
        <p> <i> Cargo: </i> {{ selected["Cargo Representante"] }} </p>

        <hr />

        <p>
            <i> Telefone: </i>
            {{
                    selected["Telefone"]
                        ? "(" + selected["DDD"] + ") " + selected["Telefone"]
                        : "não possui"
            }}
        </p>
        <p> <i> E-mail: </i> {{ selected["Endereco eletronico"] || "não possui" }} </p>
        <p>
            <i> Endereço: </i>
            {{ selected["Logradouro"] }}, número {{ selected["Numero"] }}
            {{ selected["Complemento"] ? ", " + selected["Complemento"] : "" }}
        </p>
        <p>
            <i> </i>
            {{ selected["Bairro"] }}, {{ selected["Cidade"] }},
            {{ selected["UF"] }}, CEP {{ selected["CEP"] }}
        </p>

        <hr />

        <div class="d-flex justify-content-between">
            <button class="btn btn-danger" @click="deleteEntry(selected)">
                <BIconTrashFill />
                Excluir
            </button>

            <button class="btn btn-dark" @click="editEntry(selected)" data-toggle="modal" data-target="#operatorEdit">
                <BIconPen />
                Editar
            </button>
        </div>
    </Modal>

    <EditModal :selected="selected" />
</template>

<script>
import Modal from "./Modal.vue";
import EditModal from "./EditModal.vue";
import { dbURL } from "../../utils";
import { BIconTrashFill, BIconPen } from "bootstrap-icons-vue";

export default {
    name: "DetailsModal",

    props: ["selected"],

    emits: ["deleted"],

    components: {
        Modal,
        EditModal,
        BIconTrashFill,
        BIconPen,
    },

    methods: {
        deleteEntry(entry) {
            fetch(dbURL + "/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    registrationNumber: entry["Registro ANS"],
                }),
            })
                .then(() => {
                    $("#operatorInfo-close").click();
                    this.$emit("deleted");
                })
                .catch((e) => console.log(e));
        },

        editEntry() {
            this.selected["CNPJ"] = this.selected["CNPJ"].replace(/\D/g, "");
            this.selected["Registro Original"] = this.selected["Registro ANS"];

            let date = new Date(this.selected["Data Registro ANS"]);
            date = date.toISOString().slice(0, 10);
            this.selected["Data Registro ANS"] = date.toString();

            $("#operatorInfo-close").click();
        },
    },
};
</script>

<style scoped>
p {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}
</style>
