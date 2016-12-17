import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import * as TabActions from 'actions/tabs';

class TabsComponent extends Component{
    constructor(){
        super();
    }

    componentWillMount() {
        if(this.props.children.constructor === Array){
            let ids = [];
            this.props.children.map((child) => {
                ids.push(child.props.title);
            });
            this.props.initTab(this.props.id, ids);
        } else {
            this.props.initTab(this.props.id, [this.props.children.props.title]);
        }
    }

    @autobind
    activateTab(tab){
        this.props.focusTab(tab);
    }

    @autobind
    closeTab(tab){

    }

    getTabFromStore(){
        for(let tab of this.props.tabs.tabs){
            if(tab.id === this.props.id){
                return tab;
            }
        }
    }
    
    render() {

        let head = [];
        let content = [];
        
        let activeTab = this.getTabFromStore().focusedTab;

        if(this.props.children.constructor === Array){
            this.props.children.map((item, key) => {
                content.push(<div className="Tab" key={key} style={{display : activeTab == key ? 'initial' : 'none'}}>{this.props.children[key]}</div>);
                head.push(<TabHead icon={item.props.icon} onActivate={this.activateTab} onClose={this.closeTab} id={key} active={key === activeTab ? true : false} title={item.props.title} key={key}/>);
            })
        } else {
            content = this.props.children;
            head.push(<TabHead icon={this.props.children.props.icon} key={0} onActivate={this.activateTab} active title={this.props.children.props.title}/>)
        }

        return (
            <div className="Tabs">
                <div className="head">
                    <div className="menu-horizontal left">
                        {head}
                    </div>
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            );
    }
}

export class Tab extends Component{
    render() {
        return <div className={`Tab ${this.props.scrollable ? 'scrollable' : ''}`}>{this.props.children}</div>
    }
}

class TabHead extends Component{

    @autobind
    click(){
        this.props.onActivate(this.props.title);
    }

    @autobind
    close(){
        this.props.onClose(this.props.title);
    }

    render() {
        return <div onClick={this.click} className={`item ${this.props.active ? 'active' : 'unactive'}`}>{this.props.icon ? <i className={`fa ${this.props.icon} icon`}/> : false}<span className={`title ${this.props.icon ? 'hasIcon' : ''}`}>{this.props.title}</span></div>
    }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TabActions, dispatch);
}

export const Tabs = connect(mapStateToProps, mapDispatchToProps)(TabsComponent);