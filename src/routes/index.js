import { Switch } from "react-router-dom";
import Route from './Route'

import Login from '../pages/Login'
import CadastroCliente from '../pages/CadastroCliente'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Login} />
            <Route path="/cadastrocliente" component={CadastroCliente} />
        </Switch>
    )
}
