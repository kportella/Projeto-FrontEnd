import { Grid, TextField, Button } from "@material-ui/core"
import { useContext } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import { CalcularValor } from "../../../../services/proposta-routes"
import { handleValorSolicitado } from "../../../../services/propostas-services"


function FormValorSolicitado() {
    const { valorSolicitado, setValorSolicitado,
        prazo, setPrazo, setValorFinanciado
    } = useContext(PropostaContext)

    return (
        <Grid container
            spacing={2}
            direction='row'
            justifyContent='space-between'
            alignItems='flex-end'>
            <Grid item xs={5}>
                <TextField label='Valor Solicitado'
                    id='valorSolicitado'
                    type='number'
                    fullWidth margin='normal'
                    value={valorSolicitado}
                    onChange={e => setValorSolicitado(e.target.value)} />
            </Grid>
            <Grid item xs={2}>
                <TextField label='Prazo'
                    id='prazo'
                    type='number'
                    fullWidth margin='normal'
                    value={prazo}
                    onChange={e => setPrazo(e.target.value)} />
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={e => handleValorSolicitado(e, prazo,
                    valorSolicitado,
                    setValorFinanciado)}>
                    Calcular Valor Financiado
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormValorSolicitado
