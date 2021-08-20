import { useContext } from 'react';
import { Route } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';
import Cadastro from '../pages/CadastroCliente';
import Login from '../pages/Login';

const Router = ({
    component: Component,
    ...props
}) => {
    const { token } = useContext(AuthContext);
    return (
        <Route {...props} render={() => {
            return token ? (<Cadastro />) : (<Login />)
        }} />
    )
}

export default Router;
