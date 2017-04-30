import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin()

class Template extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <header>
                        <h1>TicTacTuring</h1>
                        <FlatButton
                            label={'Test button'}
                            primary={true}
                            onTouchTap={()=>{console.log('hello I work')}}
                        />
                    </header>
                    <main>
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Template