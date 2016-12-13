import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';

let THEME = 'tomorrow_night_eighties';
require('brace/theme/' + THEME);


let def = `import { Game } from 'Engine';

export default class Test extends Script{
    constructor(){
        super();
        
        this.damn;
    }
}
`;

export default class CodeEditor extends Component {
    render() {
        return( 
            <AceEditor width="100%" height="100%" mode="javascript" defaultValue={def} theme={THEME} name="CodeEditor" editorProps={{$blockScrolling: true}}/>
        );
    }
}