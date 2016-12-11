import React, { Component } from 'react';

export class Block extends React.Component{
    render() {

        let style = {
            flex : this.props.width || this.props.height ? 'initial' : 1,
            flexDirection : this.props.direction,
            width : this.props.width || 'auto',
            height : this.props.height || 'auto',
        }

        let content;

        if(this.props.children.constructor === Array && !this.props.disableResize){
            content = [];
            
            this.props.children.map((obj, key) => {
                content.push(obj);

                if(key !== this.props.children.length - 1){
                    content.push(<div key={key} className={`divider ${this.props.direction || ''}`}></div>);
                }    
            }); 

        } else {
            content = this.props.children;
        }

        return <div className="Block" style={style}>{content}</div>
    }
}