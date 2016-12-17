import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GameActions from 'actions/game';
import {createGameObject, addComponent, changeComponentValue} from 'actions/game';

import InspectorComponent from 'components/Inspector/Component.jsx';

class Inspector extends Component {

    @autobind
    objChangeId(e){
        let newId = e.target.value;
        this.props.objChangeId(this.props.inspector.currentObj, newId);
    }

    @autobind
    addComponentButtonClick(){
        this.props.addComponent(this.props.inspector.currentObj);
    }
 
    showObj(){
        let obj = this.props.inspector.currentObj;
        if(obj === null){
            return false;
        }

        return (
            <div>
                <div className="objHeader">
                    <div className="row">
                        <i className="fa fa-cube objIcon"/>
                        <input onChange={this.objChangeId} value={obj.id} className="input"/>
                    </div>
                </div>
                {obj.components.map((component, key) => {
                    return <InspectorComponent component={component} key={key}/>
                })}
                <div className="flex mt-10">
                    <div className="row center">
                        <button onClick={this.addComponentButtonClick} className="btn">Add component</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="Inspector">
                {this.showObj()}
            </div>
        )
    }

}

function mapStateToProps(state) {
  return {
      inspector : state.inspector,
      game : state.game
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(GameActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspector);

