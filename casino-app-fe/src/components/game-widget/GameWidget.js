import React, { Component } from 'react';
import './GameWidget.css';
class GameWidget extends Component{

    state = {
        class: `item ${this.props.styleClass}`,
    }

    render(){
        return(
            <div className={this.state.class}>
                 <img src={this.props.url} alt={this.props.name} title={this.props.name}></img>
            </div>
        );
    }
}

export default GameWidget;
