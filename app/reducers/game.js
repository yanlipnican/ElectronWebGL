import Game from 'engine/Game.js';
import Loader from 'engine/Loader.js';
import Script from 'engine/Script.js';
import GameObject from 'engine/GameObject.js';

import { START_GAME, STOP_GAME, ADD_CHILD, INIT_GAME, ADD_SCRIPT} from 'actions/game';

const initialState = {
    game : null,
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
          state.game.init();
          state.game.start();
          break;
      }
      case STOP_GAME:
      {
          state.game.stop();
          break;
      }
      case ADD_CHILD:
      {
          if(action.obj !== null){
            action.obj.addChild(action.child);
          } else {
              state.game.addChild(action.child);
          }
          break;
      }
      case ADD_SCRIPT:
      {
        if(action.obj !== null){
        action.obj.addScript(action.script);
        } else {
            state.game.addScript(action.script);
        }
        break;
      }
  }

  return Object.assign({}, state);
}