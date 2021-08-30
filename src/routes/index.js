import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from '../pages/Login'
import CadastroProposta from '../pages/CadastroProposta'
import ConsultarProposta from "../pages/ConsultaProposta";

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
                <PrivateRoute exact path='/cadastroproposta' component={CadastroProposta}>
                </PrivateRoute>

                <PrivateRoute exact path='/consultarproposta' component={ConsultarProposta} />
            </Switch>
        </Router >
    )
}
