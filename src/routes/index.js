import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from '../pages/Login'
import CadastroProposta from '../pages/CadastroProposta'

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
            </Switch>
        </Router >
    )
}
