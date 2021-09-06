import { Grid, TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { PropostaContext } from "../../../../contexts/proposta";
import { ConsultarCEP } from "../../../../services/proposta-routes"

function FormCEP() {

    const { cep, setCEP, regexp, hasErrorCEP, setHasErrorCEP, setLogradouro, setBairro, setCidade } = useContext(PropostaContext)

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
