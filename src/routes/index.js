import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import TicTacYuan from '../containers/TicTacYuan'
import Profile from '../containers/Profile'
import Relay from 'react-relay'
import auth from '../utils/auth'

const ViewerQueries = {
    viewer: () => Relay.QL`query { viewer }`
}

const createRoutes = () => {
    return (
        <Route
            path="/"
            component={Template}
            queries={ViewerQueries}
            auth={auth}
        >
            <IndexRoute
                component={TicTacYuan}
                queries={ViewerQueries}
            />
            <Route
                path={'/profile'}
                component={Profile}
                queries={ViewerQueries}
            />
        </Route>
    )
}

const Routes = createRoutes()

export default Routes