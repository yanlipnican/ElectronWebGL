import autobind from 'autobind-decorator';
import * as PIXI from 'pixi.js';

export default class Game {

    constructor(width, height) {
        this.renderer = this.initRenderer(width, height);
        this.canvas = this.initCanvas(this.renderer);
        this.stage = this.initStage();
        
        this.running = false;
        this.scripts = [];
        this.children = [];
        this.loop();
    }

    initStage() {
        return new PIXI.Container();
    }
    
    initCanvas(renderer) {
        return renderer.view;
    }

    initRenderer(width, height) {
        return new PIXI.WebGLRenderer(width, height);
    }

    changeResolution(width, height) {
        renderer.resize(width, height);
    }

    start(){
        this.running = true;
    }

    stop(){
        this.running = false;
    }

    init(){
        this.scripts.map((script) => {
            script.init();
        })
        this.children.map((child) => {
            child.init();
        })
        this.start();
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
        this.scripts.push(new script(this, this));
    }

    addChild(child){
        this.children.push(child);
        
        this.stage.addChild(child.container);
    }

    getGameObjectById(id){
        let gameObject = recursivelyFindObject(this, 'children', (obj) => {
            return obj.id === id;
        });

        return gameObject;
    }

    @autobind
    loop() {
        window.requestAnimationFrame(this.loop);
        if(this.running){
            this.update();
            this.renderer.render(this.stage);
        }
    }

}

function recursivelyFindObject(root, key, resolve) {
    for(let obj of root[key]){
        if(resolve(obj)) return obj;
        else return recursivelyFindObject(obj, key, resolve);
    }

    return null;
}