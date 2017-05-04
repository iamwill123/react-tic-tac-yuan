import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer';
import {Header, Main} from '../styled/Template'
import Relay from 'react-relay'

injectTapEventPlugin()

class Template extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavDrawer
                        auth={this.props.route.auth}
                        authenticated={this.props.viewer.user}  //  pass along true if this.props.viewer.user is true so if not, null. And pass along null, if this.props.viewer is null. (false)
                    />
                    <Header>
                        Tic Tac Yuaning
                    </Header>
                    <Main>
                        {this.props.children}
                    </Main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Relay.createContainer(
    Template, {
        fragments: {
            viewer: () => Relay.QL`
                fragment on Viewer {
                    user {
                        id
                    }
                }
            `,
        }
    }
)