import { Button, Grid, TextField } from "@material-ui/core"
import { useCallback, useContext, useState } from "react"
import { PropostaContext } from "../../contexts/proposta"
import { ValidarCPF } from '../../services/proposta'


function FormCPF() {
    const { cpf, setCPF, buttonConsultarCPF, regexp, setHasError, hasError } = useContext(PropostaContext)

    const onHandleSetCPF = (e) => {
        if ((e.target.value === '' || regexp.test(e.target.value)) && e.target.value.length <= 11) setCPF(e.target.value)
    }

    const onHandleCPF = useCallback((e) => {
        if (ValidarCPF(e.target.value)) {
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
                    value={cpf}
                    onChange={e => onHandleSetCPF(e)}
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
