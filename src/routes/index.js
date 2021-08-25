import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from '../pages/Login'
import CadastroCliente from '../pages/CadastroCliente'
import ConsultarProposta from '../pages/ConsultarProposta'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            sessionStorage.token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

export default function Routes() {
    return (
        < Router >
            <Switch>
                <Route exact path='/' component={Login}>
                </Route>
                <PrivateRoute exact path='/cadastroproposta' component={CadastroCliente}>
                </PrivateRoute>
                <PrivateRoute exact path='/consultarproposta' component={ConsultarProposta}>
                </PrivateRoute>
            </Switch>
        </Router >
    )
}
