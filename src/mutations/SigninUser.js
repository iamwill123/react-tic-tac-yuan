import Relay from 'react-relay'

export default class SigninUser extends Relay.Mutation {       // documentation on graph.cool

    getVariables() {
        return {
            auth0: {
                idToken: this.props.idToken
            }
        }
    }

    getMutation () {    // auto generated by graph.cool
        return Relay.QL`mutation{signinUser}`
    }

    getFatQuery () {
        return Relay.QL`
            fragment on SigninPayload {
                viewer
            }
        `
    }

    getConfigs () {
        return [
            {
                type: 'REQUIRED_CHILDREN',
                children: [
                    Relay.QL`
                        fragment on SigninPayload {
                            viewer {
                                user {
                                    id
                                }
                            }
                        }
                    `
                ]
            }
        ]
    }
}