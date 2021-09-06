import { useContext } from 'react';
import { Grid, Typography, TextField, BottomNavigation, BottomNavigationAction, Icon } from '@material-ui/core'
import './CadastroProposta.css';
import '@fontsource/roboto'
import FormPessoal from './Components/FormPessoal';
import FormResidencia from './Components/FormResidencia';
import FormProposta from './Components/FormProposta';
import { PropostaContext } from '../../contexts/proposta';

import BarraNavegacao from '../../components/BarraNavegacao';
import { useEffect } from 'react';

function CadastroProposta() {
    const { proposta, setProposta,
        setDataSituacao,
        setUsuario,
        setSituacao } = useContext(PropostaContext)

    useEffect(() => {
        setDataSituacao(new Date().toISOString())
        setUsuario(sessionStorage.usuario)
        setSituacao('AG')
    }, [])


    return (
        <Grid container
            direction='column'
            justifyContent='center'
            alignItems='center'>
            <BarraNavegacao />
            <Grid item>
                <Typography variant='h4' component='h1' align='left'>Cadastro de Proposta</Typography>
                <Typography variant='h6' component='h2' align='left'>Complete o formulário abaixo</Typography>
            </Grid>
            <form>
                <Grid item xs={12}>
                    <Grid container
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        alignItems='baseline'
                    >
                        <Grid item xs={10}>
                            <TextField label='Proposta'
                                disabled
                                id='proposta'
                                fullWidth margin='normal'
                                value={proposta}
                                onChange={e => setProposta(e.target.value)}
                                InputProps={{
                                    readOnly: true,
                                }} />
                        </Grid>
                    </Grid>
                    <Grid container
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        alignItems='baseline'>
                        <FormPessoal />
                        <FormResidencia />
                    </Grid>
                </Grid>

                <Grid container
                    spacing={2}
                    direction='row'
                    justifyContent='center'
                    alignItems='baseline'>
                    <FormProposta />
                </Grid>
            </form >
        </Grid >
    )
}

export default CadastroProposta
