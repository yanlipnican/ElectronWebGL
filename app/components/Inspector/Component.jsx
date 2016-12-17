import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GameActions from 'actions/game';
import {createGameObject, addComponent, changeComponentValue} from 'actions/game';

class InspectorComponent extends Component {

    constructor(){
        super();
        this.state = {expanded : true};
    }

    @autobind
    handleDropdownButtonClick(){
        this.setState({expanded: !this.state.expanded});
    }
    
    handleValueChange(component, key){
        let handler = (e) => {
            let newValue = e.target.value;
            this.props.changeComponentValue(component, key, newValue);
        } 
        return handler.bind(this);
    }

    getComponentInput(component){
        let inputs = [];
        
        for(let key in component.getClass().proptypes){
            let proptype = component.getClass().proptypes[key];
            let defaultValue = component.getDefaultValues()[key];
            inputs.push(<div key={key} className="row"><label className="flex-1">{key}</label><input onChange={this.handleValueChange(component, key)} value={defaultValue} className="input flex-2" /></div>)
        }

        return inputs;
    }

    render(){
        return (
            <div className="component">
                <div className="head"><span className="componentName"><i className="icon fa fa-cog"/>{this.props.component.getClass().name}</span><i onClick={this.handleDropdownButtonClick} className="fa fa-caret-down dropDown"/></div>
                {this.state.expanded ? 
                    <div className="content flex">
                        {this.getComponentInput(this.props.component)}
                    </div>
                : false}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(InspectorComponent);

