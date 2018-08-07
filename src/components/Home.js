import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import VideoSearch from './VideoSearch'
import './Home.css'

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
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column" style={{textAlign: "center"}}>
                                <VideoSearch/>
                                {this.props.authStore.searchResults.map((video, index) => {
                                        return (
                                            <div key={video.etag}>
                                                {video.clicked ?
                                                    <div>
                                                        {!video.loaded ?
                                                            <div>
                                                                <img style={{maxWidth: 400}} alt="Loading Image"
                                                                     src={`https://i.ytimg.com/vi/${video.id.videoId}/hqdefault.jpg`}/>
                                                                <i className="spinner fas fa-spinner fa-spin"/>
                                                            </div> : ''}
                                                        <iframe
                                                            className={!video.loaded ? "video-player not-loaded" : "video-player"}
                                                            title={video.etag} width="400"
                                                            height="315"
                                                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                                            onLoadCapture={() => this.props.authStore.videoLoaded(index)}>
                                                        </iframe>
                                                    </div>
                                                    :
                                                    <div>
                                                        <img style={{maxWidth: 400}} alt="Loading Image"
                                                             src={`https://i.ytimg.com/vi/${video.id.videoId}/hqdefault.jpg`}/>
                                                        <i onClick={() => this.props.authStore.clickVideo(index)}
                                                           className="play far fa-play-circle"/>
                                                    </div>}

                                            </div>)
                                    }
                                )}
                            </div>
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default inject("authStore")(observer(Home));

