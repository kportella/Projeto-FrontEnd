import { useContext, useEffect, useState } from 'react';
import './CadastroCliente.css';
import { calcularIdade, CalcularValor, ConsultarCEP, ConsultarConveniada, EnvioProposta, ValidarCPF } from '../../services/proposta'
import { AuthContext } from '../../contexts/auth';
import BarraDeNavegacao from '../../components/BarraDeNavegacao'


function Cadastro() {

    const { usuario } = useContext(AuthContext)

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

    const dataAtualizacao = new Date();
    const dataSituacao = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(typeof dataNascimento, new Date(dataNascimento))
        const idadePermitida = calcularIdade(new Date(dataNascimento))
        const TreinaPropostasEntity = {
            CPF: cpf,
            Conveniada: conveniada,
            Vlr_Solicitado: parseFloat(valorSolicitado),
            Prazo: parseInt(prazo),
            Observacao: observacao,
            Vlr_Financiado: parseFloat(valorFinanciado),
            Situacao: "AG",
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

        const isEmpty = ((obj) => {
            const element = new Array;
            let aux = Object.entries(obj);
            for (let x = 0; x < aux.length; x++) {
                if (aux[x][1] === '' && aux[x][0] != 'Observacao') {
                    element.push(aux[x][0])
                }
                else if (typeof aux[x][1] === 'number') {
                    if (isNaN(aux[x][1])) element.push(aux[x][0])
                }
            }
            return element;
        })
        const total = [...isEmpty(TreinaPropostasEntity), ...isEmpty(TreinaClientesEntity)]
        console.log(total);
        if (total.length === 0) {
            if (idadePermitida && (ValidarCPF(cpf))) {
                EnvioProposta({ TreinaPropostasEntity, TreinaClientesEntity });
                alert('Proposta Cadastrada')
            }
            else {
                if (!idadePermitida) alert("Usuário menor de idade")
                else alert("CPF inválido")
            }
        }
        else {
            if (total.length > 1) alert(`Os campos ${total} são obrigatorios`);
            else alert(`O campo ${total} é obrigatorio`)
        }
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
        if (response === 1) {
            alert("Formato de CEP inválido")
        }
        else if (response === 2) {
            alert("Formato de CEP inválido")
        } else if (response === 3) {
            alert("CPF inválido")
        }
        else {
            setLogradouro(response.logradouro);
            setBairro(response.bairro);
            setCidade(response.localidade);
        }
    }
    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
        })
    }, [])

    return (
        <div>
            <BarraDeNavegacao></BarraDeNavegacao>
            <div>
                <h1 id="titulo">Cadastro de Proposta</h1>
                <p id="subtitulo">Complete o formulário abaixo</p>
            </div>

            <div className='body'>

                <form onSubmit={handleSubmit}>
                    {/* Formulario do Cliente */}
                    <fieldset className="grupo">
                        <div className="campo">
                            <div className='pessoal'>
                                <label for="cpf">CPF</label>
                                <input type='text' name='cpf' id="cpf" value={cpf} onChange={e => setCPF(e.target.value)} maxLength='11' />
                                <label for="nome">Nome</label>
                                <input type='text' name='nome' id='nome' value={nome} onChange={e => setNome(e.target.value)} />
                                <label for="salario">Valor do Salario</label>
                                <input type='number' name='salario' id='salario' value={valorSalario}
                                    onChange={e => setValorSalario(e.target.value)} />
                                <label for="dataNascimento">Data de Nascimento</label>
                                <input type='date' name='dataNascimento' id='dataNascimento' value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)} />
                                <label for='genero'>Genero</label>
                                <select name='genero' id='genero' value={genero} onChange={e => setGenero(e.target.value)}>
                                    <option value='M'>Masculino</option>
                                    <option value='F'>Feminino</option>
                                </select>
                            </div>
                            <div className='endereco'>
                                <label for='CEP'>CEP</label>
                                <input type='text' name='CEP' id='CEP' value={cep} onChange={e => setCEP(e.target.value)} />
                                <button onClick={handleCEP} className='CEPButton'>Consultar CEP</button>
                                <label for='numeroResidencia'>Numero da Residencia</label>
                                <input type='text' name='numeroResidencia' id='numeroResidencia' value={numeroResidencia}
                                    onChange={e => setNumeroResidencia(e.target.value)} />
                                <label for='logradouro'>Logradouro</label>
                                <input type="text" name="logradouro" id='logradouro' value={logradouro} />
                                <label for='bairro'>Bairro</label>
                                <input type="text" name="bairro" id='bairro' value={bairro} />
                                <label for='cidade'>Cidade</label>
                                <input type="text" name="cidade" id='cidade' value={cidade} />
                            </div>
                        </div>
                    </fieldset>
                    {/* Formulario da Proposta */}
                    <fieldset className='grupo'>
                        <div className='campo'>
                            <label for='conveniada'>Convenio</label>
                            <select name='conveniada' id='conveniada' value={conveniada} onChange={e => setConveniada(e.target.value)}>
                                {conveniadas.map(item => <option value={item.conveniada}>{item.descricao}</option>)}
                            </select>
                            <label for='valorSolicitado'>Valor Solicitado</label>
                            <input type='number' name='valorSolicitado' id='valorSolicitado' value={valorSolicitado}
                                onChange={e => setValorSolicitado(e.target.value)} />
                            <button onClick={handleValorSolicitado} className='ValorButton'>Calcular Valor Financiado</button>
                            <label for='prazo'>Prazo</label>
                            <input type='number' name='prazo' id='prazo' value={prazo} onChange={e => setPrazo(e.target.value)} />
                            <label for='valorFinanciado'>Valor Financiado</label>
                            <input type="number" name="valorFinanciado" id='valorFinanciado' value={valorFinanciado} />
                            <label for='observacao'>Observação</label>
                            <textarea name='observacao' id='observacao' value={observacao}></textarea>

                            <input type='submit' value='Submit' id='log' />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Cadastro
