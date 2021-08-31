import { Grid, Typography, TextField, Button, TableContainer, TableHead, TableCell, Table, TableRow, TableBody } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import BarraNavegacao from "../../components/BarraNavegacao";
import { PegarTodasPropostas, ValidarCPF } from "../../services/proposta";

function ConsultarProposta() {

    const regexp = /^[0-9\b]+$/;
    const [cpf, setCPF] = useState('');
    const [hasError, setHasError] = useState({ cpf: { hasError: false, text: '' } });
    const [propostas, setPropostas] = useState([]);
    const rows = [];
    const [render, setRender] = useState(false)

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

    const getData = async () => {
        PegarTodasPropostas().then(proposta => {
            setPropostas(proposta)
        })
        console.log(propostas)
        propostas.map(proposta => console.log(proposta.treinaClienteEntity.cpf))
    }

    return (
        <Grid container
            direction='column'
            justifyContent='center'
            alignItems='center'>
            <BarraNavegacao />
            <Grid item>
                <Typography variant='h4' component='h1' align='left'>Consulta de Proposta</Typography>
                <Typography variant='h6' component='h2' align='left'>Preencha o CPF desejado</Typography>
            </Grid>
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
                    <Button variant='contained' color='primary' onClick={e => getData(e)}>
                        Consultar CPF
                    </Button>
                </Grid>
            </Grid>

            <Grid item>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CPF</TableCell>
                                <TableCell align="right">Nome do Cliente</TableCell>
                                <TableCell align="right">Proposta</TableCell>
                                <TableCell align="right">Conveniada</TableCell>
                                <TableCell align="right">Valor Solicitado</TableCell>
                                <TableCell align="right">Prazo</TableCell>
                                <TableCell align="right">Situação</TableCell>
                                <TableCell align="right">Valor Financiado</TableCell>
                                <TableCell align="right">Observação</TableCell>
                                <TableCell align="right">Data Situação</TableCell>
                                <TableCell align="right">Usuário</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {propostas.map((proposta) => (
                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        {proposta.treinaPropostasEntity.cpf}
                                    </TableCell>
                                    <TableCell align="right">{proposta.treinaClientesEntity.nome}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.proposta}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.conveniada}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.vlr_Solicitado}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.prazo}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.situacao}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.vlr_Financiado}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.observacao}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.dt_Situacao}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.usuario}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    )
}

export default ConsultarProposta;
