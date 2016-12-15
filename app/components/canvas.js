import autobind from 'autobind-decorator';

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Game from 'engine/Game.js';
import Loader from 'engine/Loader.js';
import Script from 'engine/Script.js';
import GameObject from 'engine/GameObject.js';

import { initGame, addScript, startGame, addChild, stopGame} from 'actions/game';

class testScript extends Script{

    async init(){

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

    async test(){
        let texture = await Loader.loadTexture('ninja', 'res/test_sprite.png');
        
        let ninjaSprite = new PIXI.Sprite(texture);
        let ninjaSprite2 = new PIXI.Sprite(texture);

        let ninja = new GameObject('ninja', this.game);
        let ninja2 = new GameObject('ninja2', this.game);
        
        ninja.setSprite(ninjaSprite);
        ninja2.setSprite(ninjaSprite2);

        this.context.store.dispatch(addChild(ninja));
        this.context.store.dispatch(addScript(testScript, ninja));
        this.context.store.dispatch(startGame());

        setTimeout(() => {
            this.context.store.dispatch(stopGame());
        },2000)

        setTimeout(() => {
            console.log(this.context.store.getState().game.scene.children[0].sprite.position);
        },10000)
    }

    @autobind
    updateGameStateFromReducer(){
        let state = this.context.store.getState();
        let game = state.game.game;
        if(game !== null && !this.inited){
            findDOMNode(this.refs.container).appendChild(game.canvas);
            this.inited = true;
        }
    }

    render() {

        let style = {
            backgroundColor: '#333',
        }

        return <div style={style} className="GameWindow" ref="container"></div>
    }

}