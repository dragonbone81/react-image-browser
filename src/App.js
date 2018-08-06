import React, {Component} from 'react';
import NavBar from './components/NavBar'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Auth from './components/Auth'

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
}

export default App;
