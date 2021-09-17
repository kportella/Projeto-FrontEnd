import { CalcularValor, ConsultarCEP, ConsultarCPF, EnvioProposta, PegarTodasPropostas, VerificarSituacao } from "./proposta-routes";

export function calcularIdade(dataNascimento) {
    console.log(dataNascimento)
    const anoNascimento = dataNascimento.getFullYear();
    const mesNascimento = dataNascimento.getMonth() + 1;
    const diaNascimento = dataNascimento.getDate()

    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const mesAtual = dataAtual.getMonth() + 1
    const diaAtual = dataAtual.getDate() - 1

    let quantos_anos = anoAtual - anoNascimento;

    if (mesAtual < mesNascimento || mesAtual == mesNascimento && diaAtual < diaNascimento) {
        quantos_anos--;
    }
    if (quantos_anos >= 18) {
        return true
    }
    else {
        if (anoNascimento > anoAtual) alert('Data futuro não permitido')
        else if (anoNascimento == anoAtual) {
            if (mesNascimento > mesAtual) alert('Data futuro não permitido')
            else if (mesAtual == mesNascimento) {
                if (diaNascimento > diaAtual) alert('Data futuro não permitida')
            }
        }
        else alert('Usuario menor de idade')
        return false
    }
}

export function ValidarCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    let CPFInvalido = true;

    if (strCPF.length < 11) return false

    for (let i = 0; i < strCPF.length; i++) {
        if (strCPF[0] != strCPF[i]) {
            CPFInvalido = false
            break;
        }
    }

    if (CPFInvalido) return false

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export const isEmpty = ((obj) => {
    const element = new Array;
    let aux = Object.entries(obj);
    for (let x = 0; x < aux.length; x++) {
        if (aux[x][1] === '' && aux[x][0] != 'Observacao' && aux[x][0] != 'Proposta') {
            element.push(aux[x][0])
        }
        else if (typeof aux[x][1] === 'number') {
            if (isNaN(aux[x][1])) element.push(aux[x][0])
        }
    }
    return element;
})

export const mCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

export const testarCPF = (cpf, setHasError, setCPF) => {
    let substring1 = '';
    let substring2 = '';
    let stringFinal = '';
    if (cpf.includes('.') && cpf.includes('-')) {
        substring1 = cpf.split('.')
        substring2 = substring1[2].split('-')
        stringFinal = substring1[0] + substring1[1] + substring2[0] + substring2[1]
    }
    if (ValidarCPF(stringFinal) || cpf.length == 0) {
        setHasError({ cpf: { hasError: false } })
        setCPF(stringFinal)
    }
    else {
        setHasError({ cpf: { hasError: true, text: 'CPF Inválido' } })
    }
}

export const PegarDescricaoSituacao = (propostas, situacoes) => {
    propostas.forEach(proposta => {
        situacoes.map(element => {
            if (element.situacao == proposta.treinaPropostasEntity.situacao) proposta.treinaPropostasEntity.descricaoSituacao = element.descricao
        })
    })
}

export const PegarDescricaoConveniada = (propostas, conveniadas) => {
    propostas.forEach(proposta => {
        conveniadas.map(element => {
            if (element.conveniada == proposta.treinaPropostasEntity.conveniada) proposta.treinaPropostasEntity.descricaoConveniada = element.descricao
        });
    });
}

export const MascararCPF = (propostas) => {
    propostas.forEach(proposta => {
        proposta.treinaPropostasEntity.cpf = mCPF(proposta.treinaPropostasEntity.cpf)
    })
}

export const onHandleSetMascaraCPF = (e, setMascaraCPF) => {
    if (e.target.value.length <= 14) setMascaraCPF(mCPF(e.target.value))
}

export const getData = async (setPropostas, cpf) => {
    console.log(cpf)
    if (!cpf) {
        PegarTodasPropostas().then(proposta => {
            setPropostas(proposta)
        })
    }
    else if (ValidarCPF(cpf)) {
        ConsultarCPF(cpf).then(proposta => {
            setPropostas([proposta])
        })
    }
}

export const handleCEP = async (e, cep, setHasErrorCEP, setLogradouro, setBairro, setCidade) => {
    e.preventDefault();
    const body = {
        CEP: cep
    }
    const response = await ConsultarCEP(body);
    switch (response) {
        case 1:
            setHasErrorCEP({ cep: { hasError: true, text: "CEP não encontrado" } })
            break;
        case 2:
            setHasErrorCEP({ cep: { hasError: true, text: "Formato de CEP inválido" } })
            break;
        case 3:
            setHasErrorCEP({ cep: { hasError: true, text: "CEP vazio" } })
            break;
        default:
            setHasErrorCEP({ cep: { hasError: false } })
            setLogradouro(response.logradouro);
            setBairro(response.bairro);
            setCidade(response.localidade);
            break;
    }
}

export const onHandleSetCEP = (e, regexp, setCEP) => {
    if ((e.target.value === '' || regexp.test(e.target.value)) && e.target.value.length <= 9) setCEP(e.target.value)
}

export const buttonConsultarCPF = async (e, cpf, setProposta,
    setNome,
    setValorSolicitado,
    setPrazo,
    setObservacao,
    setDataNascimento,
    setGenero,
    setValorSalario,
    setCEP,
    setNumeroResidencia,
    setValorFinanciado,
    setLogradouro,
    setBairro,
    setCidade,
    setDataSituacao,
    setSituacao,
    setUsuario,
    setConveniada,
    setDescricaoSituacao) => {
    e.preventDefault();
    const response = await ConsultarCPF(cpf);
    if (response.treinaClientesEntity != null && response.treinaPropostasEntity != null) {
        console.log("entrou")
        setProposta(response.treinaPropostasEntity.proposta)
        setNome(response.treinaClientesEntity.nome)
        setValorSolicitado(response.treinaPropostasEntity.vlr_Solicitado)
        setPrazo(response.treinaPropostasEntity.prazo)
        setObservacao(response.treinaPropostasEntity.observacao)
        setDataNascimento(new Date(response.treinaClientesEntity.dt_Nascimento).toISOString().split('T')[0])
        setGenero(response.treinaClientesEntity.genero)
        setValorSalario(response.treinaClientesEntity.vlr_Salario)
        setCEP(response.treinaClientesEntity.cep)
        setNumeroResidencia(response.treinaClientesEntity.numero_Residencia)
        setValorFinanciado(response.treinaPropostasEntity.vlr_Financiado)
        setLogradouro(response.treinaClientesEntity.logradouro)
        setBairro(response.treinaClientesEntity.bairro)
        setCidade(response.treinaClientesEntity.cidade)
        setDataSituacao(response.treinaPropostasEntity.dt_Situacao)
        setSituacao(response.treinaPropostasEntity.situacao)
        setUsuario(response.treinaPropostasEntity.usuario)
        setConveniada(response.treinaPropostasEntity.conveniada)
        await VerificarSituacao(response.treinaPropostasEntity.situacao, setDescricaoSituacao)
    }
    else {
        setProposta('')
        setNome('')
        setValorSolicitado('')
        setPrazo('')
        setObservacao('')
        setDataNascimento('')
        setGenero('M')
        setValorSalario('')
        setCEP('')
        setNumeroResidencia('')
        setValorFinanciado('')
        setLogradouro('')
        setBairro('')
        setCidade('')
        setConveniada('000020')
        setSituacao('AG')
        setDataSituacao(new Date().toISOString())
        setUsuario(sessionStorage.usuario)
    }
}

export const handleSubmit = async (e, dataNascimento,
    cpf,
    valorSolicitado,
    prazo,
    situacao,
    dataAtualizacao,
    nome,
    genero,
    valorSalario,
    logradouro,
    numeroResidencia,
    bairro,
    cidade,
    cep,
    setProposta,
    setNome,
    setValorSolicitado,
    setPrazo,
    setObservacao,
    setDataNascimento,
    setGenero,
    setValorSalario,
    setCEP,
    setNumeroResidencia,
    setValorFinanciado,
    setLogradouro,
    setBairro,
    setSituacao,
    setDataSituacao,
    setUsuario,
    setCidade,
    setCPF,
    conveniada,
    observacao,
    valorFinanciado,
    dataSituacao,
    usuario,
    setConveniada) => {
    e.preventDefault()
    const idadePermitida = calcularIdade(new Date(dataNascimento))
    const TreinaPropostasEntity = {
        CPF: cpf,
        Conveniada: conveniada,
        Vlr_Solicitado: parseFloat(valorSolicitado),
        Prazo: parseInt(prazo),
        Observacao: observacao,
        Vlr_Financiado: parseFloat(valorFinanciado),
        Situacao: situacao,
        Dt_Situacao: dataSituacao,
        Usuario: usuario,
        Usuario_Atualizacao: "SISTEMA",
        Data_Atualizacao: dataAtualizacao
    }
    const TreinaClientesEntity = {
        CPF: cpf,
        Nome: nome,
        Dt_Nascimento: new Date(dataNascimento),
        Genero: genero,
        Vlr_Salario: parseFloat(valorSalario),
        Logradouro: logradouro,
        Numero_Residencia: numeroResidencia,
        Bairro: bairro,
        Cidade: cidade,
        CEP: cep,
        Usuario_Atualizacao: "SISTEMA",
        Data_Atualizacao: dataAtualizacao
    }
    const total = [...isEmpty(TreinaPropostasEntity), ...isEmpty(TreinaClientesEntity)]
    if (total.length === 0) {
        if (idadePermitida && (ValidarCPF(cpf))) {

            const response = await EnvioProposta({ TreinaPropostasEntity, TreinaClientesEntity });
            alert('Proposta Gravada')
            setProposta('')
            setCPF('')
            setNome('')
            setValorSolicitado('')
            setPrazo('')
            setObservacao('')
            setDataNascimento('')
            setGenero('M')
            setValorSalario('')
            setCEP('')
            setNumeroResidencia('')
            setValorFinanciado('')
            setLogradouro('')
            setBairro('')
            setCidade('')
            setConveniada('000020')
            setSituacao('')
            setDataSituacao('')
            setUsuario('')
        }
        else {
            if (idadePermitida) alert('CPF inválido')
        }
    }
    else {
        if (total.length > 1) alert(`Os campos ${total} são obrigatorios`);
        else alert(`O campo ${total} é obrigatorio`)
    }
}

export const handleValorSolicitado = async (e,
    prazo,
    valorSolicitado,
    setValorFinanciado) => {
    e.preventDefault();
    let Prazo = parseInt(prazo);
    let Vlr_Solicitado = parseFloat(valorSolicitado)
    if (isNaN(Prazo) || isNaN(Vlr_Solicitado)) {
        return alert("Valor Solicitado e/ou Prazo não podem ser vazios")
    }
    const valorRecebido = await CalcularValor({ Prazo, Vlr_Solicitado });
    setValorFinanciado(valorRecebido.vlr_Solicitado)
}

