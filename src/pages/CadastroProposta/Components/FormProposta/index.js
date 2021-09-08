import { Grid, TextField, Button, MenuItem } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { PropostaContext } from "../../../../contexts/proposta";
import FormValorSolicitado from "../FormValorSolicitado";
import { ConsultarConveniada, EnvioProposta } from '../../../../services/proposta-routes'
import { calcularIdade, isEmpty, ValidarCPF } from "../../../../services/propostas-services"

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
        setProposta
    } = useContext(PropostaContext)

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
                            readOnly: true,
                        }} />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={e => handleSubmit(e)}>
                        Gravar Proposta
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormProposta
