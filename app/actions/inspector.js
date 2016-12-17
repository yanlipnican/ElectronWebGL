export const INSPECTOR_SHOW = 'INSPECTOR_SHOW';
export const INSPECTOR_DEFOCUS = 'INSPECTOR_DEFOCUS';

export function inspectorShow(obj){
    return {type : INSPECTOR_SHOW, obj};
}

export function inspectorDefocus(){
    return {type : INSPECTOR_DEFOCUS};
}