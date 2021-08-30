import { useContext } from 'react';
import { Grid, Typography, TextField, BottomNavigation, BottomNavigationAction, Icon } from '@material-ui/core'
import './CadastroProposta.css';
import '@fontsource/roboto'
import FormPessoal from '../../components/FormPessoal';
import FormResidencia from '../../components/FormResidencia';
import FormProposta from '../../components/FormProposta';
import { PropostaContext } from '../../contexts/proposta';
import { ExitToApp, Search, Add } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import BarraNavegacao from '../../components/BarraNavegacao';

function CadastroProposta() {
    const { proposta, setProposta } = useContext(PropostaContext)


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
