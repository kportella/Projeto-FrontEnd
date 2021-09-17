import { Grid, Typography, TextField, Button, TableContainer, TableHead, TableCell, Table, TableRow, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { useCallback, useEffect, useState } from "react";
import BarraNavegacao from "../../components/BarraNavegacao";
import { PropostaContext } from "../../contexts/proposta";
import { ConsultarConveniada, ConsultarCPF, PegarTodasPropostas, TodasDescricoes } from "../../services/proposta-routes";
import { onHandleSetMascaraCPF, ValidarCPF, testarCPF, PegarDescricaoConveniada, getData, PegarDescricaoSituacao, MascararCPF } from "../../services/propostas-services"

function ConsultarProposta() {

    const { conveniadas, setConveniadas } = useContext(PropostaContext)

    const [cpf, setCPF] = useState('');
    const [hasError, setHasError] = useState({ cpf: { hasError: false, text: '' } });
    const [propostas, setPropostas] = useState([]);
    const [situacoes, setSituacoes] = useState([]);
    const [mascaraCPF, setMascaraCPF] = useState('')

    const onHandleCPF = useCallback((e) => {
        testarCPF(e.target.value, setHasError, setCPF)
    }, []);

    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
        })
        PegarDescricaoConveniada(propostas, conveniadas)
        PegarDescricaoSituacao(propostas, situacoes);
        MascararCPF(propostas);
    }, [propostas])

    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
        })
        TodasDescricoes().then(situacao => {
            setSituacoes(situacao);
        })
    }, [])




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
                        value={mascaraCPF}
                        onChange={e => onHandleSetMascaraCPF(e, setMascaraCPF)}
                        onBlur={e => onHandleCPF(e)}
                        error={hasError.cpf.text}
                        helperText={hasError.cpf.hasError == true ? hasError.cpf.text : 'Opcional'} />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={() => getData(setPropostas, cpf)}>
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
                                <TableCell align="left">Nome do Cliente</TableCell>
                                <TableCell align="left">Proposta</TableCell>
                                <TableCell align="left">Conveniada</TableCell>
                                <TableCell align="left">Valor Solicitado</TableCell>
                                <TableCell align="left">Prazo</TableCell>
                                <TableCell align="left">Situação</TableCell>
                                <TableCell align="left">Valor Financiado</TableCell>
                                <TableCell align="left">Observação</TableCell>
                                <TableCell align="left">Data Situação</TableCell>
                                <TableCell align="left">Usuário</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {propostas.map((proposta) => (
                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        {proposta.treinaPropostasEntity.cpf}
                                    </TableCell>
                                    <TableCell align="left">{proposta.treinaClientesEntity.nome}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.proposta}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.descricaoConveniada}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.vlr_Solicitado}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.prazo}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.descricaoSituacao}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.vlr_Financiado}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.observacao}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.dt_Situacao.split('T')[0]}</TableCell>
                                    <TableCell align="left">{proposta.treinaPropostasEntity.usuario}</TableCell>
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
