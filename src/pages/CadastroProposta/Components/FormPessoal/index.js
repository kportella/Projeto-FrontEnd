import { Grid, TextField, MenuItem } from "@material-ui/core"
import { useContext, useState } from "react"
import { PropostaContext } from "../../../../contexts/proposta"
import FormCPF from "../FormCPF"

function FormPessoal() {

    const { nome, setNome,
        valorSalario, setValorSalario,
        dataNascimento, setDataNascimento,
        genero, setGenero } = useContext(PropostaContext)


    return (
        <Grid item xs={5}>
            <FormCPF />
            <TextField label='Nome'
                id='nome'
                fullWidth margin='normal'
                value={nome}
                onChange={e => setNome(e.target.value)} />
            <TextField label='Valor do Salário'
                id='senha'
                type='number'
                fullWidth margin='normal'
                value={valorSalario}
                onChange={e => setValorSalario(e.target.value)} />
            <TextField
                id='dataNascimento'
                label='Data de Nascimento'
                fullWidth margin='normal'
                type='date'
                value={dataNascimento}
                max={new Date().toISOString().split('T')[0]}
                onChange={e => {
                    setDataNascimento(e.target.value)
                    console.log(dataNascimento)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    max: new Date().toISOString().split('T')[0],
                }}
            />
            <TextField
                label='Genero'
                select
                value={genero}
                onChange={e => setGenero(e.target.value)}
                fullWidth margin='normal'
                name='genero'>
                <MenuItem value='M'>Masculino</MenuItem>
                <MenuItem value='F'>Feminino</MenuItem>
            </TextField>
        </Grid>
    )
}

export default FormPessoal
