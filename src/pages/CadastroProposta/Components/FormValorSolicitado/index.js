import { Grid, TextField, Button } from "@material-ui/core"
import { useContext } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import { CalcularValor } from "../../../../services/proposta-routes"

function FormValorSolicitado() {
    const { valorSolicitado, setValorSolicitado,
        prazo, setPrazo, setValorFinanciado
    } = useContext(PropostaContext)

    const handleValorSolicitado = async (e) => {
        e.preventDefault();
        let Prazo = parseInt(prazo);
        let Vlr_Solicitado = parseFloat(valorSolicitado)
        if (isNaN(Prazo) || isNaN(Vlr_Solicitado)) {
            return alert("Valor Solicitado e/ou Prazo não podem ser vazios")
        }
        const valorRecebido = await CalcularValor({ Prazo, Vlr_Solicitado });
        setValorFinanciado(valorRecebido.vlr_Solicitado)
    }


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
                <Button variant='contained' color='primary' onClick={e => handleValorSolicitado(e)}>
                    Calcular Valor Financiado
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormValorSolicitado
