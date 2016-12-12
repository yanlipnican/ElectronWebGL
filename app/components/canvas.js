import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Game from 'engine/Game.js';
import Loader from 'engine/Loader.js';
import Script from 'engine/Script.js';
import GameObject from 'engine/GameObject.js';

class testScript extends Script{

    async init(){
        let texture = await Loader.loadTexture('ninja', 'res/test_sprite.png');
        let ninjaSprite = new PIXI.Sprite(texture);

        let ninja = new GameObject('ninja');
        ninja.setSprite(ninjaSprite);

        this.game.addChild(ninja);
        
    }

    update(){
        //this.game.getGameObjectById('ninja').move(1,0);
    }

}

export class Canvas extends Component{
    constructor() {
        super();

        this.game;
    }

    componentWillMount(){
        this.game = new Game(this.props.width, this.props.height);
        this.game.addScript(testScript);
    }

    componentDidMount(){
        findDOMNode(this.refs.container).appendChild(this.game.canvas);
        this.game.init();
    }

    render() {

        let style = {
            backgroundColor: '#333',
        }


        return <div style={style} className="GameWindow" ref="container"></div>
    }

}