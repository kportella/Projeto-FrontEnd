import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import '@fontsource/roboto'
import './Login.css'

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(false)
    const [errorMessage, setErroMessage] = useState('')

    let history = useHistory();

    const { SignIn } = useContext(AuthContext)

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        let control = await SignIn({ usuario, senha }, setErroMessage)
        if (control) {
            history.push('/cadastroproposta')
        }
        else {
            setError(true)
        }
    }

    useEffect(() => sessionStorage.removeItem('token'))

    return (
        <Grid container
            direction='row'
            justifyContent='center'
            alignItems='center'
            className='container'
        >
            <Grid item xs={6}>
                {error ? <Alert severity="error">{errorMessage}</Alert> : <></>}
                <Typography variant='h4' component='h1' align='left'>Login</Typography>
                <Typography variant='h6' component='h2' align='left'>Coloque usuário e senha</Typography>
                <TextField label='Usuário'
                    id='usuario'
                    fullWidth margin='normal'
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)} />
                <TextField label='Senha'
                    id='senha'
                    type='password'
                    fullWidth margin='normal'
                    value={senha}
                    onChange={e => setSenha(e.target.value)} />

                <Button type='submit' variant='contained' color='primary' onClick={e => handleSubmit(e)}>
                    Entrar
                </Button>
            </Grid>

        </Grid>
    )
}

export default Login;
