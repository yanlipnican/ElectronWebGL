import { INIT_TAB, FOCUS_TAB } from 'actions/tabs';

const initialState = {
    tabs: [],
}

export default function counter(state = initialState, action) {
  switch (action.type) {
      case INIT_TAB:
      {
          state.tabs.push(new Tab(action.id, action.ids));
          break;
      }
      case FOCUS_TAB:
      {
          state.tabs.map((tab) => {
              tab.focusTab(action.id);
          });

          break;
      }
  }

  return Object.assign({}, state);
}

class Tab{
    constructor(id, ids){
        this.ids = ids;
        this.focusedTab = 0;
        this.id = id;
    }

    focusTab(id){
        let index = this.ids.indexOf(id);
        if(index !== -1){
            this.focusedTab = index;
        }
    }
}