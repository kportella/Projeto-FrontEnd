import { Grid, TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { PropostaContext } from "../../contexts/proposta";

function FormCEP() {

    const { cep, handleCEP, setCEP, regexp, hasErrorCEP } = useContext(PropostaContext)

    const onHandleSetCEP = (e) => {
        if ((e.target.value === '' || regexp.test(e.target.value)) && e.target.value.length <= 9) setCEP(e.target.value)
    }



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
                    onChange={e => onHandleSetCEP(e)}
                    error={hasErrorCEP.cep.hasError}
                    helperText={hasErrorCEP.cep.hasError == true ? hasErrorCEP.cep.text : 'Obrigatório'}
                />
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={e => handleCEP(e)}>
                    Consultar CEP
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormCEP
