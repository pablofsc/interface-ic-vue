<template>
    <div :id="id" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered" :class="small ? 'modal' : 'modal-lg'">
            <div class="modal-content">
                <div class="modal-header">
                    <h5> <b>{{ title }}</b> </h5>

                    <button v-if="!small" :id="id + '-close'" class="btn btn-dark" data-dismiss="modal" @click="onClose">
                        <BIconXLg />
                    </button>
                </div>

                <div class="modal-body">
                    <slot>

                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BIconXLg } from "bootstrap-icons-vue";

export default {
    name: "Modal",

    props: {
        id: String,
        title: String,
        onClose: Function,
        small: Boolean,
    },

    components: {
        BIconXLg,
    },
};
</script>

<style scoped>
@media (max-width: 1000px) {
    .modal-lg {
        max-width: 90% !important;
    }
}

.modal-header {
    display: flex;
    align-items: center;
}

h5 {
    margin: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
