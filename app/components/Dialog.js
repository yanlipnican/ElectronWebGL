import React from 'react';

export default class Dialog extends React.Component{
    
    render(){
        return (
            <div className="Dialog">
                <div className="window">
                    <div className="header">
                        <div className="title">{this.props.title}</div>
                        <div className="controls"><i className="fa fa-times-circle exit"/></div>
                    </div>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}