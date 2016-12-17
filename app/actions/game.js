export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const INIT_GAME = 'INIT_GAME';
export const CREATE_GAMEOBJECT = "CREATE_GAMEOBJECT";
export const ADD_COMPONENT = "ADD_COMPONENT";
export const OBJ_CHANGE_ID = "OBJ_CHANGE_ID";
export const CHANGE_COMPONENT_VALUE = "CHANGE_COMPONENT_VALUE";

export function objChangeId(obj, id){
    return {type : OBJ_CHANGE_ID, obj, id};
}

export function startGame() {
    return {type : START_GAME};
}

export function stopGame(){
    return {type : STOP_GAME};
}

export function initGame(width, height){
    return {type : INIT_GAME, width, height};
}

export function createGameObject(id, parent = null){
    return {type: CREATE_GAMEOBJECT, id, parent};
}

export function addComponent(obj, component){
    return {type: ADD_COMPONENT, obj, component};
}

export function changeComponentValue(component,key, newValue){
    return {type : CHANGE_COMPONENT_VALUE, component, key, newValue};
}
