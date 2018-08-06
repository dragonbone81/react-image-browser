import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types';

@inject("authStore")
@observer
class NavBar extends Component {
    state = {
        hamburgerClicked: false,
    };

    render() {
        return (
            <nav className="navbar" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png"
                             alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
                    </a>

                    <div onClick={this.hamburgerClicked} role="button"
                         className={"navbar-burger " + (this.state.hamburgerClicked ? "is-active" : "")}
                         aria-label="menu"
                         aria-expanded="false">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </div>
                </div>
                <div className={"navbar-menu " + (this.state.hamburgerClicked ? "is-active" : "")}>
                    <div className="navbar-start">
                        {this.props.authStore.isLoggedIn && !!this.props.authStore.displayUsername ?
                            <div className="navbar-item">Welcome {this.props.authStore.displayUsername}</div>
                            : ''
                        }
                        <div className="navbar-item">
                            <NavLink className="navbar-item" to="/">
                                Home
                            </NavLink>
                        </div>
                    </div>
                    <div className="navbar-end">
                        {!this.props.authStore.isLoggedIn ?
                            <div className="navbar-item">
                                <button onClick={this.props.authStore.login}
                                        className="button">Login
                                </button>
                            </div>
                            :
                            <div className="navbar-item">
                                <button onClick={this.props.authStore.logout}
                                        className="button">Logout
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        );
    };

    hamburgerClicked = () => {
        this.setState({
            hamburgerClicked: !this.state.hamburgerClicked,
        });
    };
}

NavBar.propTypes = {
    authStore: PropTypes.object,
};

export default NavBar