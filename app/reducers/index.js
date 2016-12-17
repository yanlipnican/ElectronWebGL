// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import tabs from 'reducers/tabs';
import game from 'reducers/game';
import inspector from 'reducers/inspector';

const rootReducer = combineReducers({
  routing,
  tabs,
  game,
  inspector,
});

export default rootReducer;
