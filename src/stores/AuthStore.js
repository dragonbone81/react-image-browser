import {observable, action} from 'mobx'

const cliendID = "371bb3035e6e450e9a63e907561fc439";

export default class AuthStore {
    auth = observable({clientId: "", token: ""});
    // @observable loginURL = 'https://accounts.spotify.com/authorize' +
    //     '?response_type=code' +
    //     '&client_id=' + cliendID + '&scope=user-library-read' +
    //     '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback';
    // @action
    // loginCallback = (callback) => {
    //     console.log(callback)
    // }

}