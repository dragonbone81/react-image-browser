import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";

class VideoSearch extends Component {
    render() {
        return (
            <div>
                <input style={{maxWidth: 300}} value={this.props.authStore.searchTerm} className="input is-info"
                       type="text" placeholder="Search for videos" onChange={this.setSearchTerm}
                       onKeyUp={this.searchKeyPress}/>
                <button onClick={this.searchButtonPress} className="button is-primary">
                    {!this.props.authStore.searchHappened && !this.props.authStore.searching ?
                        <i style={{fontSize: 20}} className="fas fa-arrow-right"/> : !this.props.authStore.searching ?
                            <i style={{fontSize: 20}} className="fas fa-check"/> :
                            <i style={{fontSize: 20}} className="fas fa-spinner fa-spin"/>}

                </button>
            </div>
        )
    }

    setSearchTerm = (event) => {
        this.props.authStore.setSearchTerm(event.target.value);
    };

    searchButtonPress = () => {
        if (this.props.authStore.searchTerm)
            this.search();
    };
    searchKeyPress = (event) => {
        if (this.props.authStore.searchTerm && event.key === "Enter")
            this.search();
    };
    search = () => {
        this.props.authStore.searchByTerm().then();
    };
}

VideoSearch.propTypes = {
    authStore: PropTypes.object,
};

export default inject("authStore")(observer(VideoSearch));