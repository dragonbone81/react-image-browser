import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from "prop-types";
import NavBar from "./NavBar";

@inject("authStore")
@observer
class Auth extends Component {
    render() {
        return (
            <div>Auth</div>
        )
    }

    componentDidMount() {
        const token = new URLSearchParams(window.location.href.split("#").pop()).get("access_token");
        this.props.authStore.loginCallback(token);
        this.props.history.push(localStorage.getItem("redirectPath"));
    }
}

NavBar.propTypes = {
    authStore: PropTypes.object,
};

export default Auth