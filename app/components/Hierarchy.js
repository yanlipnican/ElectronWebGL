import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GameActions from 'actions/game';
import * as InspectorActions from 'actions/inspector';

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

    @autobind
    showInInspector(obj){
        // return handler for li element on click
        let handler = () => {
            this.props.inspectorShow(obj);
        }

        return handler.bind(this);
    }

    render() {
        return (
            <div className="Hierarchy">
                <div className="topBar">
                    <button className="btn" onClick={this.enableAddition}>Create</button><input className="search input" placeholder="Search..."/>
                </div>
                <ul className="">
                    {this.props.game.scene.gameObjects.map((obj, key) => {
                        return <li className={`${this.props.inspector.currentObj === obj ? 'focused' : ''}`} onClick={this.showInInspector(obj)} key={key}>{obj.id.length > 0 ? obj.id : 'null'}</li>
                    })}
                </ul>
                {this.state.addition ?
                    <div>
                        <input className="additionInput" autoFocus ref="idInput" onKeyUp={this.onEnter} onBlur={this.addObj}/>
                    </div>
                : 
                    false
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
  return {
      game: state.game,
      inspector : state.inspector
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(GameActions, InspectorActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Hierarchy);