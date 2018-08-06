import {observable, action, computed, flow} from 'mobx'

const clientID = "371bb3035e6e450e9a63e907561fc439";

export default class AuthStore {
    redirectURI = window.location.protocol + "//" +
        window.location.hostname + (!!window.location.port ? (":" + window.location.port) : "") +
        '/auth/callback';
    loginURL = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + clientID + '&scope=user-library-read' +
        '&redirect_uri=' + encodeURIComponent(this.redirectURI);
    @observable auth = {token: "", user: {}};
    //action
    loginCallback = flow(function* (token) {
        localStorage.setItem("token", token);
        this.auth.token = token;
        let response = yield fetch("https://api.spotify.com/v1/me", {headers: {"Authorization": `Bearer ${token}`}});
        response = yield response.json();
        this.auth.user = response;
        localStorage.setItem("user", JSON.stringify(this.auth.user));
    });

    @action
    setLoginAttributes = (token, user) => {
        this.auth.user = user;
        this.auth.token = token;
    };

    @action
    logout = () => {
        this.auth = {token: "", user: {}};
        localStorage.clear();
    };
    @action
    login = () => {
        localStorage.setItem("redirectPath", window.location.pathname);
        window.location = this.loginURL
    };

    @computed
    get isLoggedIn() {
        return (!!this.auth.token && !!this.auth.user)
    }

    @computed
    get displayUsername() {
        return this.auth.user ?
            this.auth.user.display_name ? this.auth.user.display_name :
                this.auth.user.id : null
    }

}