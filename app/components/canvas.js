import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Engine from 'engine/main.js';

export class Canvas extends Component{
    constructor() {
        super();

        this.engine;
    }

    componentWillMount(){
        this.engine = new Engine(this.props.width, this.props.height);
    }

    componentDidMount(){
        findDOMNode(this.refs.container).appendChild(this.engine.canvas);

        this.engine.test();
    }

    render() {

        let style = {
            backgroundColor: '#333',
        }


        return <div style={style} className="GameWindow" ref="container"></div>
    }

}