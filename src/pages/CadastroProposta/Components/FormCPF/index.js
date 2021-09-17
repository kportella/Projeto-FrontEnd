import { Button, Grid, TextField } from "@material-ui/core"
import { useCallback, useContext, useState } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import { buttonConsultarCPF, onHandleSetMascaraCPF, testarCPF } from '../../../../services/propostas-services'


function FormCPF() {
    const { cpf, setCPF,
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

    const onHandleCPF = useCallback((e) => {
        testarCPF(e.target.value, setHasError, setCPF)
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
                    onChange={e => onHandleSetMascaraCPF(e, setMascaraCPF)}
                    onBlur={e => onHandleCPF(e)}
                    error={hasError.cpf.hasError}
                    helperText={hasError.cpf.hasError == true ? hasError.cpf.text : 'Obrigatório'} />

            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={e => buttonConsultarCPF(e, cpf, setProposta,
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
                    setDescricaoSituacao)}>
                    Consultar CPF
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormCPF;
