import { Grid, TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { PropostaContext } from "../../../../contexts/proposta";
import { handleCEP, onHandleSetCEP } from "../../../../services/propostas-services"

function FormCEP() {

    const { cep, setCEP, regexp, hasErrorCEP, setHasErrorCEP, setLogradouro, setBairro, setCidade } = useContext(PropostaContext)

    return (
        <Grid container
            spacing={2}
            direction='row'
            justifyContent='flex-start'
            alignItems='center'>
            <Grid item xs={5}>
                <TextField label='CEP'
                    id='CEP'
                    fullWidth margin='normal'
                    value={cep}
                    onChange={e => onHandleSetCEP(e, regexp, setCEP)}
                    error={hasErrorCEP.cep.hasError}
                    helperText={hasErrorCEP.cep.hasError == true ? hasErrorCEP.cep.text : 'Obrigatório'}
                />
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={e => handleCEP(e, cep, setHasErrorCEP, setLogradouro, setBairro, setCidade)}>
                    Consultar CEP
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormCEP
