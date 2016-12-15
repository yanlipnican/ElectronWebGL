import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GameActions from 'actions/game';
import {createGameObject} from '../actions/game';

const KEY_ENTER = 13;

class Hierarchy extends Component {
    
    constructor(){
        super();
        this.state = {
            addition : false,
        }
    }

    @autobind
    enableAddition(){
        this.setState({addition : true});
    }

    @autobind
    addObj(){
        let value = this.refs.idInput.value;
        if(value.length > 0){
            this.props.createGameObject(this.refs.idInput.value);
        }
        this.setState({addition : false});
    }

    @autobind
    onEnter(e){
        if(e.which === KEY_ENTER){
            this.addObj();
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.game.scene.gameObjects.map((obj, key) => {
                        return <li key={key}>{obj.id}</li>
                    })}
                </ul>
                {this.state.addition ?
                    <div>
                        <input autoFocus ref="idInput" onKeyUp={this.onEnter} onBlur={this.addObj}/>
                    </div>
                : 
                    <button onClick={this.enableAddition}>ADD test</button>
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
  return {
      game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GameActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Hierarchy);