import { INSPECTOR_SHOW, INSPECTOR_DEFOCUS } from 'actions/inspector';

const initialState = {
    currentObj : null
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INSPECTOR_SHOW:
    {
        state.currentObj = action.obj;
        break;
    }
    case INSPECTOR_DEFOCUS:
    {
        state.currentObj = null;
        break;
    }
  }

  return Object.assign({}, state);
}