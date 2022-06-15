export const ufArray = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MS',
    'MT',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
];

export const modalidadesArray = [
    'Administradora de Benefícios',
    'Autogestão',
    'Cooperativa Médica',
    'Cooperativa odontológica',
    'Filantropia',
    'Medicina de Grupo',
    'Odontologia de Grupo',
    'Seguradora Especializada em Saúde'
];

export const createEntryObject = (form) => {
    return {
        'Razao Social': form['razao-social'].value,
        'Nome Fantasia': form['nome-fantasia'].value,
        'Modalidade': form['modalidade'].value,
        'CNPJ': form['cnpj'].value,
        'Registro ANS': form['registro-ans'].value,
        'Data Registro ANS': form['data'].value,
        'Logradouro': form['logradouro'].value,
        'Numero': form['numero'].value,
        'Complemento': form['complemento'].value,
        'Bairro': form['bairro'].value,
        'Cidade': form['cidade'].value,
        'UF': form['uf'].value,
        'CEP': form['cep'].value,
        'Endereco eletronico': form['email'].value,
        'DDD': form['ddd'].value,
        'Telefone': form['telefone'].value,
        'Fax': form['fax'].value,
        'Representante': form['representante'].value,
        'Cargo Representante': form['cargo'].value
    };
};

export const parseCNPJ = (cnpj) => {
    return cnpj
        .toString()
        .padStart(14, '0')
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export const compare = (a, b, property) => {
    return a[property] === b[property]
}