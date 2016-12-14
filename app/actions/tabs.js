export const INIT_TAB = 'INIT_TAB';
export const FOCUS_TAB = 'FOCUS_TAB';

export function initTab(id, ids) {
    return {type : INIT_TAB, id, ids};
}

export function focusTab(id){
    return {type : FOCUS_TAB, id};
}