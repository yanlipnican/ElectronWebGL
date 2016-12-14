import autobind from 'autobind-decorator';

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Game from 'engine/Game.js';
import Loader from 'engine/Loader.js';
import Script from 'engine/Script.js';
import GameObject from 'engine/GameObject.js';

import { initGame, addScript, startGame } from 'actions/game';

class testScript extends Script{

    async init(){
        let texture = await Loader.loadTexture('ninja', 'res/test_sprite.png');
        let ninjaSprite = new PIXI.Sprite(texture);

        let ninja = new GameObject('ninja');
        ninja.setSprite(ninjaSprite);

        this.game.addChild(ninja);
    }

    update(){
        this.game.getGameObjectById('ninja').move(1,0);
    }

}

export class Canvas extends Component{
    constructor() {
        super();
        this.inited = false;
    }

    static contextTypes = {
        store : React.PropTypes.object,
    }

    componentWillMount(){

    }

    componentDidMount(){
        this.context.store.subscribe(this.updateGameStateFromReducer);
        this.context.store.dispatch(initGame(this.props.width, this.props.height));
    }

    @autobind
    updateGameStateFromReducer(){
        let state = this.context.store.getState();
        let game = state.game.game;
        if(game !== null && !this.inited){
            findDOMNode(this.refs.container).appendChild(game.canvas);
            this.inited = true;
            this.context.store.dispatch(addScript(testScript));
            this.context.store.dispatch(startGame());
        }
    }

    render() {

        let style = {
            backgroundColor: '#333',
        }

        return <div style={style} className="GameWindow" ref="container"></div>
    }

}