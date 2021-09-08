import { useState, createContext } from 'react';

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
            situacao, setDataSituacao,
            regexp, setSituacao,
            usuario, setUsuario,
            descricaoSituacao, setDescricaoSituacao,
            dataAtualizacao
        }}>
            {children}
        </PropostaContext.Provider>
    )

}

export default PropostaProvider;
