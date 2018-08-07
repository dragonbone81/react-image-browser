import {observable, action, computed, flow, decorate, configure} from 'mobx'

configure({enforceActions: true});

class AuthStore {
    clientID = "371bb3035e6e450e9a63e907561fc439";
    redirectURI = window.location.protocol + "//" +
        window.location.hostname + (!!window.location.port ? (":" + window.location.port) : "") +
        '/auth/callback';
    loginURL = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + this.clientID + '&scope=user-library-read' +
        '&redirect_uri=' + encodeURIComponent(this.redirectURI);

    auth = {token: "", user: {}};

    setLoginAttributes = (token, user) => {
        this.auth.user = user;
        this.auth.token = token;
    };

    logout = () => {
        this.auth = {token: "", user: {}};
        localStorage.clear();
    };

    login = () => {
        localStorage.setItem("redirectPath", window.location.pathname);
        window.location = this.loginURL
    };

    get isLoggedIn() {
        return (!!this.auth.token && !!this.auth.user)
    }

    get displayUsername() {
        return this.auth.user ?
            this.auth.user.display_name ? this.auth.user.display_name :
                this.auth.user.id : null
    }

    loginCallback = flow(function* (token) {
        localStorage.setItem("token", token);
        this.auth.token = token;
        let response = yield fetch("https://api.spotify.com/v1/me", {headers: {"Authorization": `Bearer ${token}`}});
        response = yield response.json();
        this.auth.user = response;
        localStorage.setItem("user", JSON.stringify(this.auth.user));
    });
}

decorate(AuthStore, {
    auth: observable,
    setLoginAttributes: action,
    logout: action,
    login: action,
    isLoggedIn: computed,
    displayUsername: computed,
});
export default new AuthStore()