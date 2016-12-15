export default class Component{
    constructor(parent, props){
        this.parent = parent;
        this._constructor(...props);
    }

    game(){
        return this.parent.game;
    }

    // Define properties accessible from editor
    static proptypes = {};
    static defaultValues = {};
    // Called in constructor
    _constructor(){}
    // Called at game.start
    start(){}
    // Called once a renderLoop
    update(){}
    // Called once a gameLoop
    logicUpdate(){}

}

class Transform extends Component{

    static proptypes = {
        x : Number,
        y : Number,
        scale : Number,
    }

    static defaultValues = {
        x : 0,
        y : 0,
        scale : 1
    }

    _constructor(x, y, scale){
        this.container = PIXI.Container();
        this.setPosition(x,y);
        this.setScale(scale);
    }

    setPosition(x, y){
        this.container.position.x = x;
        this.container.position.y = y;
    }

    setScale(scale){
        this.container.scale.x = scale;
        this.container.scale.y = scale;
    }

    move(x = 0, y = 0) {
        this.container.position.x += x;
        this.container.position.y += y;
    }

    getPosition(){
        return {x: this.container.position.x, y: this.container.position.y};
    }

    getScale(){
        return {x: this.container.scale.x, y: this.container.scale.y};
    }

}

// gameObject.Transform.setPosition(20, 10);
// gameObject.Transform.setScale(2);
// gameObject.Transform.container.addChild(sprite);
// renderer.render(gameObject.Transform.container);