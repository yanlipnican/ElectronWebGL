import Game from 'engine/Game.js';
import Loader from 'engine/Loader.js';
import Script from 'engine/Script.js';
import GameObject from 'engine/GameObject.js';
import deepCopy from 'deep-copy';

import { CHANGE_COMPONENT_VALUE, OBJ_CHANGE_ID, START_GAME, STOP_GAME, ADD_CHILD, INIT_GAME, CREATE_GAMEOBJECT, ADD_COMPONENT} from 'actions/game';

const initialState = {
    game : null,
    scene: {
        gameObjects : []
    }
}

export default function game_reduces(state = initialState, action) {
  switch (action.type) {
      case INIT_GAME:
      {
          state.game = new Game(action.width, action.height);
          break;
      }
      case START_GAME:
      {
          state.game.start();
          break;
      }
      case STOP_GAME:
      {
          state.game.stop();
          break;
      }
      case CREATE_GAMEOBJECT:
      {
          let template = new Template(action.id);

          if(action.parent === null){
              state.scene.gameObjects.push(template)
          } else {
              template.setParent(action.parent);
              action.parent.children.push(template);
          }
          break;
      }
      case OBJ_CHANGE_ID:
      {
          action.obj.id = action.id;
          break;
      }
      case ADD_COMPONENT:
      {
          let componentClass = require('engine/Component');
          let component = new componentClass(action.obj);
          component.__defaultValues = deepCopy(componentClass.defaultValues);
          action.obj.addComponent(component);
          break;
      }
      case CHANGE_COMPONENT_VALUE:
      {
          action.component.__defaultValues[action.key] = action.newValue;
          break;
      }

  }

  return Object.assign({}, state);
}

class Template{
    constructor(id){
        this.id = id;
        this.components = [];
        this.children = [];
        this.parent = null;
    }

    setId(id){
        this.id = id;
    }

    setParent(parent){
        this.parent = parent;
    }

    addComponent(component){
        this.components.push(component);
    }

    addChild(child){
        this.children.push(child);
    }

    removeChild(child){
        let index = this.children.indexOf(child);
        if(index !== -1){
            this.children.splice(index, 1);
        }
    }

    removeComponent(component){
        let index = this.components.indexOf(component);
        if(index !== -1){
            this.components.splice(index, 1);
        }
    }
}
