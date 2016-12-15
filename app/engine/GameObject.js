import * as PIXI from 'pixi.js';

export default class GameObject{
    
    constructor(id){
        this.parent = null;
        this.game = null;
        this.id = id;
        this.scripts = [];
        this.children = [];
        this.props = {};
        this.sprite = null;
        this.container = new PIXI.Container();
    }

    hasSprite(){
        return this.sprite === null ? false : true; 
    }

    setSprite(sprite) {
        this.unsetSprite();
        this.container.addChild(sprite);
        this.sprite = sprite;
    }

    unsetSprite(){
        if(this.hasSprite()){
            this.container.removeChild(this.sprite);
            this.sprite = null;
        }
    }

    init(){
        this.scripts.map((script) => {
            script.init();
        })
        this.children.map((child) => {
            child.init();
        })
    }

    update() {
        this.scripts.map((script) => {
            script.update();
        });
        this.children.map((child) => {
            child.update();
        })
    }

    addScript(script) {
        this.scripts.push(new script(this.game, this));
    }

    addChild(child){
        child.parent = this;
        child.game = this.game;

        this.children.push(child);
        this.container.addChild(child.container);
    }

    move(x, y){
        this.container.position.x += x;
        this.container.position.y += y;
    }

    getPosition(){
        return this.container.position;
    }

    setPosition(x, y){
        this.container.position.x = x;
        this.container.position.y = y;
    }

}