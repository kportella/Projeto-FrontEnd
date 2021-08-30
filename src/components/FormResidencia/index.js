import { Grid, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { PropostaContext } from "../../contexts/proposta";
import FormCEP from "../FormCEP";


function FormResidencia() {
    const { numeroResidencia, setNumeroResidencia,
        logradouro,
        bairro,
        cidade } = useContext(PropostaContext)



    return (
        <Grid item xs={5}>
            <FormCEP />
            <TextField label='Numero da Residência'
                id='numeroResidencia'
                fullWidth margin='normal'
                value={numeroResidencia}
                onChange={e => setNumeroResidencia(e.target.value)} />
            <TextField label='Logradouro'
                id='logradouro'
                disabled
                fullWidth margin='normal'
                value={logradouro}
                InputProps={{
                    readOnly: true,
                }} />
            <TextField label='Bairro'
                id='bairro'
                fullWidth margin='normal'
                disabled
                value={bairro}
                InputProps={{
                    readOnly: true,
                }} />
            <TextField label='Cidade'
                id='cidade'
                fullWidth margin='normal'
                disabled
                value={cidade}
                InputProps={{
                    readOnly: true,
                }} />
        </Grid>
    )
}

export default FormResidencia
