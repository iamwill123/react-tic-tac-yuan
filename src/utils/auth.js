import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay'
const authDomain = 'iamwill.auth0.com'
const clientId = '86iclUDT16BfSq0hHo9Ja6ygnhvn9uAF'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'

class AuthService {
    constructor() {
        this.lock = new Auth0Lock(clientId, authDomain, {  // using Auth0's tokens
            auth: {                         // What should be available to this user and what sort of privileges should they have
                params: {
                    scope: 'openid email'   // Telling them to hold their openid and email info.
                },
            },
        })

        this.showLock = this.showLock.bind(this)    //

        this.lock.on('authenticated', this.authProcess.bind(this))  // for when you hear an authenticated event run the this.authProcess
    }

    authProcess = (authResult) => {
        let {
            email,
            exp
        } = authResult.idTokenPayload

        const idToken = authResult.idToken

        this.signinUser({
            idToken,
            email,
            exp
        }).then(
            success => success,
            rejected => {
                this.createUser({
                    idToken,
                    email,
                    exp
                }).then()
            }
        )
    }
    // we want to be able to press a button and have the authentication information appear,
    // so that the user can enter their email and password. To do that we need to call lock show, so we'll make a function called showLock
    showLock() {
        this.lock.show()
    }
    // we want to have a function that's going to be able to take the authorization
    // information that we receive during authProcess, take that token and add it to our website's local storage.
    setToken = (authFields) => {
        let {
            idToken,
            exp
        } = authFields
        localStorage.setItem('idToken', idToken)
        localStorage.setItem('exp', exp * 1000) //Graph.cool doesn't accept an expired storage
    }

    isCurrent = () => {     // Will return a bool for true or false
        let expString = localStorage.getItem('exp')
        if (!expString) {
            localStorage.removeItem('idToken')      // to make sure both exp & idToken are removed
            return false
        }
        let now = new Date()
        let exp = new Date(parseInt(expString, 10)) // magic number 10 is radix parameter, needed https://davidwalsh.name/parseint-radix
        if (exp < now ) {
            this.logout()
            return false
        } else {
            return true
        }
    }

    getToken = () => {
        let idToken = localStorage.getItem('idToken')
        if (this.isCurrent() && idToken) {
            return idToken
        } else {
            localStorage.removeItem('idToken')
            localStorage.removeItem('exp')
            return false
        }
    }

    logout = () => {
        localStorage.removeItem('idToken')
        localStorage.removeItem('exp')
        location.reload()
    }

    createUser = (authFields) => {
        return new Promise( (resolve, reject) => {
            Relay.Store.commitUpdate(
                new CreateUser({
                    email:authFields.email,
                    idToken: authFields.idToken
                }), {
                    onSuccess: (response) => {
                        this.signinUser(authFields)
                        resolve(response)       // signed in successfully
                    },
                    onFailure: (response) => {
                        console.log('CreateUser error', response)
                        reject(response)
                    }
                }
            )
        })
    }

    signinUser = (authFields) => {
        return new Promise( (resolve, reject) => {
            Relay.Store.commitUpdate(
                new SigninUser({
                    idToken: authFields.idToken
                }), {
                    onSuccess: (response) => {
                        this.setToken(authFields)   // on success store token into localstorage
                    },
                    onFailure: (response) => {
                        reject(response)
                    }
                }
            )
        })
    }






}

const auth = new AuthService()

export default auth