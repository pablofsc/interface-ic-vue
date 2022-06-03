<template>
    <div class="modal fade" id="operatorInfo" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle"><b>{{ selected['Nome Fantasia'] || selected['Razao Social'] }}</b></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <p> <i> Razão Social: </i> {{ selected['Razao Social'] }} </p>
                    <p> <i> Nome Fantasia: </i> {{ selected['Nome Fantasia'] || 'não possui' }} </p>
                    <p> <i> CPNJ: </i> {{ selected['CNPJ'] }} </p>
                    <hr>
                    <p> <i> Registro ANS: </i> {{ selected['Registro ANS'] }} (registro em {{ selected['Data Registro ANS'] }}) </p>
                    <p> <i> Modalidade: </i> {{ selected['Modalidade'] }}</p>
                    <p> <i> Representante: </i> {{ selected['Representante'] }} </p>
                    <p> <i> </i> {{ selected['Cargo Representante'] }} </p>
                    <hr>
                    <p> <i> Telefone: </i> {{
                            selected['Telefone']
                                ? '(' + selected['DDD'] + ') ' + selected['Telefone']
                                : 'não possui'
                    }} </p>
                    <p> <i> E-mail: </i> {{ selected['Endereco eletronico'] || 'não possui' }}</p>
                    <p> <i> Endereço: </i> {{ selected['Logradouro'] }}, número {{ selected['Numero'] }}{{ selected['Complemento'] ? ', ' + selected['Complemento'] : '' }} </p>
                    <p> <i></i> {{ selected['Bairro'] }}, {{ selected['Cidade'] }}, {{ selected['UF'] }}, CEP {{ selected['CEP'] }} </p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Editar</button>
                    <button type="button" class="btn btn-danger">Excluir</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',

    props: ['selected'],
};
</script>

<style scoped>
p {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}
</style>