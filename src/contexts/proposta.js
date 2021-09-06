import { useCallback, useEffect, useState, createContext } from 'react';
import { CalcularValor, ConsultarCEP, ConsultarConveniada, ConsultarCPF, EnvioProposta, VerificarSituacao } from '../services/proposta-routes'
import { ValidarCPF, isEmpty, calcularIdade } from "../services/propostas-services"

export const PropostaContext = createContext({})

function PropostaProvider({ children }) {
    const regexp = /^[0-9\b]+$/
    const [proposta, setProposta] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [hasError, setHasError] = useState({ cpf: { hasError: false, text: '' } });
    const [hasErrorCEP, setHasErrorCEP] = useState({ cep: { hasError: false, text: '' } })
    const [cpf, setCPF] = useState('');
    const [nome, setNome] = useState('');
    const [conveniada, setConveniada] = useState('000020');
    const [conveniadas, setConveniadas] = useState([])
    const [valorSolicitado, setValorSolicitado] = useState('');
    const [prazo, setPrazo] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('M');
    const [valorSalario, setValorSalario] = useState('');
    const [cep, setCEP] = useState('');
    const [numeroResidencia, setNumeroResidencia] = useState('');
    const [valorFinanciado, setValorFinanciado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [situacao, setSituacao] = useState('')
    const [dataSituacao, setDataSituacao] = useState('')
    const [usuario, setUsuario] = useState('')
    const [descricaoSituacao, setDescricaoSituacao] = useState('')

    const dataAtualizacao = new Date();

    const handleSubmit = async (e) => {
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
                alert('Proposta Cadastrada')
                setProposta(response);
            }
            else {
                if (idadePermitida) alert('CPF inválido')
            }
        }
        else {
            if (total.length > 1) alert(`Os campos ${total} são obrigatorios`);
            else alert(`O campo ${total} é obrigatorio`)
        }
        console.log(proposta)
    }

    const handleValorSolicitado = async (e) => {
        e.preventDefault();
        let Prazo = parseInt(prazo);
        let Vlr_Solicitado = parseFloat(valorSolicitado)
        if (isNaN(Prazo) || isNaN(Vlr_Solicitado)) {
            return alert("Valor Solicitado e/ou Prazo não podem ser vazios")
        }
        const valorRecebido = await CalcularValor({ Prazo, Vlr_Solicitado });
        setValorFinanciado(valorRecebido.vlr_Solicitado)
    }

    const handleCEP = async (e) => {
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

    const buttonConsultarCPF = async (e) => {
        e.preventDefault();
        const response = await ConsultarCPF(cpf);
        console.log(response)
        if (response.treinaClientesEntity != null && response.treinaPropostasEntity != null) {
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
            setDescricaoSituacao(await VerificarSituacao(response.treinaPropostasEntity.situacao))
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

    return (
        <PropostaContext.Provider value={{
            proposta, setProposta,
            isReadOnly, setIsReadOnly,
            hasError, setHasError,
            hasErrorCEP, setHasErrorCEP,
            cpf, setCPF,
            nome, setNome,
            conveniada, setConveniada,
            conveniadas, setConveniadas,
            valorSolicitado, setValorSolicitado,
            prazo, setPrazo,
            observacao, setObservacao,
            dataNascimento, setDataNascimento,
            genero, setGenero,
            valorSalario, setValorSalario,
            cep, setCEP,
            numeroResidencia, setNumeroResidencia,
            valorFinanciado, setValorFinanciado,
            logradouro, setLogradouro,
            bairro, setBairro,
            cidade, setCidade,
            dataSituacao, setDataSituacao,
            buttonConsultarCPF,
            handleValorSolicitado,
            handleCEP,
            handleSubmit,
            situacao, setDataSituacao,
            regexp, setSituacao,
            usuario, setUsuario,
            descricaoSituacao
        }}>
            {children}
        </PropostaContext.Provider>
    )

}

export default PropostaProvider;
