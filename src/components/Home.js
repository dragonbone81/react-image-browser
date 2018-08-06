import React, {Component} from 'react'
import {inject, observer} from "mobx-react/index";

@inject("authStore")
@observer
class Home extends Component {
    render() {
        return (
            <div>
                {!this.props.authStore.isLoggedIn ?
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column" style={{textAlign: "center"}}>
                                <h1 style={{fontSize: 30}}>Please Login</h1>
                            </div>
                        </div>
                    </section>
                    :
                    <div>Home</div>
                }
            </div>
        )
    }
}

export default Home