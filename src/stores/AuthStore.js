import {observable, action, computed, flow, decorate, configure} from 'mobx'

configure({enforceActions: true});

class AuthStore {
    clientID = "438293051346-athvr01qt6h5v482s15vd2qqk7jm9cda.apps.googleusercontent.com";
    redirectURI = window.location.protocol + "//" +
        window.location.hostname + (!!window.location.port ? (":" + window.location.port) : "") +
        '/auth/callback';
    loginURL = 'https://accounts.google.com/o/oauth2/v2/auth' +
        '?response_type=token' +
        '&client_id=' + this.clientID + '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly' +
        '&redirect_uri=' + encodeURIComponent(this.redirectURI);

    auth = {token: "", user: {}, checkingToken: false};

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

    validateToken = async () => {
        let response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${this.auth.token}`,
            {method: 'POST'}
        );
        response = await response.json();
        if (response.error || response.error_description)
            this.logout();
    };

    get isLoggedIn() {
        return (this.auth && !!this.auth.token && !!this.auth.user)
    }

    get displayUsername() {
        return this.auth ? this.auth.user ?
            this.auth.user.username ? this.auth.user.username :
                null : null : null
    }

    loginCallback = flow(function* (token) {
        localStorage.setItem("token", token);
        this.auth.token = token;
        let response = yield fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {headers: {"Authorization": `Bearer ${token}`}});
        response = yield response.json();
        if (response.items && response.items.length > 0) {
            this.auth.user.username = response.items[0].snippet.title;
            localStorage.setItem("user", JSON.stringify(this.auth.user));
        }
    });

    searchTerm = "";
    searchResults = [];
    searching = false;
    searchHappened = false;

    setSearchTerm = (searchTerm) => {
        this.searchHappened = false;
        this.searchTerm = searchTerm;
    };

    searchByTerm = flow(function* () {
        this.searching = true;
        const maxResults = 25;
        let response = yield fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchTerm}` +
            `&type=video&maxResults=${maxResults}`, {headers: {"Authorization": `Bearer ${this.auth.token}`}});
        response = yield response.json();
        this.setSearchResults(response.items);
        this.searching = false;
        this.searchHappened = true;
    });

    setSearchResults = (results) => {
        this.searchResults = [...this.searchResults, ...results]
    };

    clickVideo = (index) => {
        this.searchResults[index].clicked = true;
        this.searchResults[index].loaded = false;
    };
    videoLoaded = (index) => {
        this.searchResults[index].loaded = true;
    };
}

decorate(AuthStore, {
    auth: observable,
    setLoginAttributes: action,
    logout: action,
    login: action,
    isLoggedIn: computed,
    displayUsername: computed,
    searchTerm: observable,
    setSearchTerm: action,
    setSearchResults: action,
    searchByTerm: action,
    searching: observable,
    searchHappened: observable,
    searchResults: observable,
    clickVideo: action,
    videoLoaded: action,
});
export default new AuthStore()