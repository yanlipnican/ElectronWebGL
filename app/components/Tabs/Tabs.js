import React, { Component } from 'react';
import autobind from 'autobind-decorator';

export class Tabs extends Component{
    constructor(){
        super();
        this.state = {
            activeTab : 0,
        }
    }

    componentWillMount() {
        
    }

    @autobind
    activateTab(tab){
        this.setState({activeTab : tab});
    }

    @autobind
    closeTab(tab){

    }
    
    render() {

        let head = [];
        let content = [];

        if(this.props.children.constructor === Array){
            this.props.children.map((item, key) => {
                content.push(<div className="Tab" key={key} style={{display : this.state.activeTab == key ? 'initial' : 'none'}}>{this.props.children[key]}</div>);
                head.push(<TabHead onActivate={this.activateTab} onClose={this.closeTab} id={key} active={key === this.state.activeTab ? true : false} title={item.props.title} key={key}/>);
            })
        } else {
            content = this.props.children;
            head.push(<TabHead key={0} active title={this.props.children.props.title}/>)
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
        this.props.onActivate(this.props.id);
    }

    @autobind
    close(){
        this.props.onClose(this.props.id);
    }

    render() {
        return <div onClick={this.click} className={`item ${this.props.active ? 'active' : 'unactive'}`}>{this.props.title}</div>
    }
}