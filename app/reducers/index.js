// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import tabs from 'reducers/tabs';
import game from 'reducers/game';

const rootReducer = combineReducers({
  routing,
  tabs,
  game,
});

export default rootReducer;
