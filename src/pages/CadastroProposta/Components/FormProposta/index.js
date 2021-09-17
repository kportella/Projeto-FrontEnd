import { Grid, TextField, Button, MenuItem } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { PropostaContext } from "../../../../contexts/proposta";
import FormValorSolicitado from "../FormValorSolicitado";
import { ConsultarConveniada, EnvioProposta } from '../../../../services/proposta-routes'
import { calcularIdade, isEmpty, ValidarCPF, handleSubmit } from "../../../../services/propostas-services"

function FormProposta() {
    const { conveniadas, setConveniadas,
        conveniada, setConveniada,
        valorFinanciado,
        observacao,
        descricaoSituacao,
        dataSituacao,
        usuario,
        proposta,
        dataNascimento,
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
        setCPF
    } = useContext(PropostaContext)



    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
        })
    }, [])

    return (
        <Grid item xs={6}>
            <TextField
                id='conveniada'
                select
                label='Conveniada'
                value={conveniada}
                onChange={e => setConveniada(e.target.value)}>
                {conveniadas.map((item) => (
                    <MenuItem value={item.conveniada}>
                        {item.descricao}
                    </MenuItem>
                ))}
            </TextField>
            <FormValorSolicitado />
            <TextField label='Valor Financiado'
                id='valorFinanciado'
                disabled
                type='number'
                fullWidth margin='normal'
                value={valorFinanciado}
                InputProps={{
                    readOnly: true,
                }} />
            <TextField label='Situação da Proposta'
                id='situacaoProposta'
                disabled
                fullWidth margin='normal'
                value={proposta ? descricaoSituacao : ''}
                InputProps={{
                    readOnly: true,
                }} />
            <TextField label='Data da Situação'
                id='dataSituacao'
                disabled
                fullWidth margin='normal'
                value={proposta ? dataSituacao.split('T')[0] : ''}
                InputProps={{
                    readOnly: true,
                }} />
            <TextField label='Usuário'
                id='usuario'
                disabled
                fullWidth margin='normal'
                value={proposta ? usuario : ''}
                InputProps={{
                    readOnly: true,
                }} />
            <Grid container
                spacing={2}
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-end'>
                <Grid item xs={5}>
                    <TextField label='Observação'
                        disabled
                        multiline
                        maxRows={5}
                        value={observacao}
                        InputProps={{
                            readOnly: false,
                        }} />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={e => handleSubmit(e, dataNascimento,
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
                        setConveniada)}>
                        Gravar Proposta
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormProposta
