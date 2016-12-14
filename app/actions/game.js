export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const ADD_CHILD = 'game_ADD_CHILD';
export const INIT_GAME = 'INIT_GAME';
export const ADD_SCRIPT = 'game_ADD_SCRIPT';

export function startGame() {
    return {type : START_GAME};
}

export function stopGame(){
    return {type : STOP_GAME};
}

export function initGame(width, height){
    return {type : INIT_GAME, width, height};
}

// obj is where in tree to add child.
export function addChild(child, obj = null){
    return {type: ADD_CHILD, child, obj};
}

// obj is where in tree to add child.
export function addScript(script, obj = null){
    return {type: ADD_SCRIPT, script, obj};
}