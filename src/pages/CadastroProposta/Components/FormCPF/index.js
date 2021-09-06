import { Button, Grid, TextField } from "@material-ui/core"
import { useCallback, useContext, useState } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import { mCPF, ValidarCPF, } from '../../../../services/propostas-services'


function FormCPF() {
    const { cpf, setCPF, buttonConsultarCPF, regexp, setHasError, hasError } = useContext(PropostaContext)

    const [mascaraCPF, setMascaraCPF] = useState('')

    const onHandleSetMascaraCPF = (e) => {
        if ((e.target.value === '' || regexp.test(e.target.value)) && e.target.value.length <= 11) setCPF(e.target.value)
        if (e.target.value.length <= 14) setMascaraCPF(mCPF(e.target.value))
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
        console.log(stringFinal)
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
