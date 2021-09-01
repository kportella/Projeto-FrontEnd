import { Grid, Typography, TextField, Button, TableContainer, TableHead, TableCell, Table, TableRow, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { useCallback, useEffect, useState } from "react";
import BarraNavegacao from "../../components/BarraNavegacao";
import { PropostaContext } from "../../contexts/proposta";
import { ConsultarConveniada, ConsultarCPF, mCPF, PegarTodasPropostas, TodasDescricoes, ValidarCPF, VerificarSituacao } from "../../services/proposta";

function ConsultarProposta() {

    const { conveniadas, setConveniadas } = useContext(PropostaContext)

    const regexp = /^[0-9\b]+$/;
    const [cpf, setCPF] = useState('');
    const [hasError, setHasError] = useState({ cpf: { hasError: false, text: '' } });
    const [propostas, setPropostas] = useState([]);
    const [situacoes, setSituacoes] = useState([]);
    const [mascaraCPF, setMascaraCPF] = useState('')


    const onHandleSetMascaraCPF = (e) => {
        if ((e.target.value === '' || regexp.test(e.target.value.split())) && e.target.value.length <= 14) setCPF(e.target.value)
        if (e.target.value.length <= 14) setMascaraCPF(mCPF(e.target.value))
        console.log(cpf)
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

    const getData = async () => {
        if (!document.getElementById('cpf').value) {
            PegarTodasPropostas().then(proposta => {
                setPropostas(proposta)
            })
        }
        else if (ValidarCPF(cpf)) {
            ConsultarCPF(cpf).then(proposta => {
                setPropostas([proposta])
            })
        }
        console.log(propostas)
    }

    const PegarDescricaoConveniada = () => {
        propostas.forEach(proposta => {
            conveniadas.map(element => {
                if (element.conveniada == proposta.treinaPropostasEntity.conveniada) proposta.treinaPropostasEntity.descricaoConveniada = element.descricao
            });
        });
    }
    const PegarDescricaoSituacao = () => {
        propostas.forEach(proposta => {
            situacoes.map(element => {
                if (element.situacao == proposta.treinaPropostasEntity.situacao) proposta.treinaPropostasEntity.descricaoSituacao = element.descricao
            })
        })
    }

    const MascararCPF = () => {
        propostas.forEach(proposta => {
            proposta.treinaPropostasEntity.cpf = mCPF(proposta.treinaPropostasEntity.cpf)
        })
    }

    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
        })
        TodasDescricoes().then(situacao => {
            setSituacoes(situacao);
        })
        PegarDescricaoConveniada()
        PegarDescricaoSituacao();
        MascararCPF();
    }, [propostas])

    useEffect(() => {
        ConsultarConveniada().then(conveniada => {
            setConveniadas(conveniada);
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
                        onChange={e => onHandleSetMascaraCPF(e)}
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
                                <TableCell align="left">Nome do Cliente</TableCell>
                                <TableCell align="right">Proposta</TableCell>
                                <TableCell align="right">Conveniada</TableCell>
                                <TableCell align="right">Valor Solicitado</TableCell>
                                <TableCell align="right">Prazo</TableCell>
                                <TableCell align="left">Situação</TableCell>
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
                                    <TableCell align="left">{proposta.treinaClientesEntity.nome}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.proposta}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.descricaoConveniada}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.vlr_Solicitado}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.prazo}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.descricaoSituacao}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.vlr_Financiado}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.observacao}</TableCell>
                                    <TableCell align="right">{proposta.treinaPropostasEntity.dt_Situacao.split('T')[0]}</TableCell>
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
