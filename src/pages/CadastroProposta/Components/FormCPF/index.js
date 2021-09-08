import { Button, Grid, TextField } from "@material-ui/core"
import { useCallback, useContext, useEffect, useState } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import { mCPF, ValidarCPF, } from '../../../../services/propostas-services'
import { ConsultarCPF, VerificarSituacao } from '../../../../services/proposta-routes'


function FormCPF() {
    const { cpf, setCPF,
        regexp,
        setHasError,
        hasError,
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
        setCidade,
        setDataSituacao,
        setSituacao,
        setUsuario,
        setConveniada,
        setDescricaoSituacao
    } = useContext(PropostaContext)

    const [mascaraCPF, setMascaraCPF] = useState('')

    const onHandleSetMascaraCPF = (e) => {
        if ((e.target.value === '' || regexp.test(e.target.value)) && e.target.value.length <= 11) setCPF(e.target.value)
        if (e.target.value.length <= 14) setMascaraCPF(mCPF(e.target.value))
    }

    const buttonConsultarCPF = async (e) => {
        e.preventDefault();
        const response = await ConsultarCPF(cpf);
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

    const onHandleCPF = useCallback((e) => {
        let substring1 = '';
        let substring2 = '';
        let stringFinal = '';
        if (e.target.value.includes('.') && e.target.value.includes('-')) {
            substring1 = e.target.value.split('.')
            substring2 = substring1[2].split('-')
            stringFinal = substring1[0] + substring1[1] + substring2[0] + substring2[1]
        }
        if (ValidarCPF(stringFinal)) {
            setHasError({ cpf: { hasError: false } })

        }
        else {
            setHasError({ cpf: { hasError: true, text: 'CPF Inválido' } })
        }
    }, []);



    return (
        <Grid container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
            <Grid item xs={5}>
                <TextField label='CPF'
                    id='cpf'
                    fullWidth margin='normal'
                    value={mascaraCPF}
                    onChange={e => onHandleSetMascaraCPF(e)}
                    onBlur={e => onHandleCPF(e)}
                    error={hasError.cpf.hasError}
                    helperText={hasError.cpf.hasError == true ? hasError.cpf.text : 'Obrigatório'} />

            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={e => buttonConsultarCPF(e)}>
                    Consultar CPF
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormCPF;
