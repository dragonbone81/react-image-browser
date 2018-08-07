import React, {Component} from 'react';
import NavBar from './components/NavBar'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Auth from './components/Auth'
import {inject, observer} from "mobx-react";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/auth/callback' component={Auth}/>
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.authStore.isLoggedIn && localStorage.getItem("token") && localStorage.getItem("user")) {
            this.props.authStore.setLoginAttributes(localStorage.getItem("token"), JSON.parse(localStorage.getItem("user")));
            this.props.authStore.validateToken().then();
        }


    }
}

export default inject("authStore")(observer(App));
