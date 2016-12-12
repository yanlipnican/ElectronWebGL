import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';

let THEME = 'tomorrow_night_eighties';
require('brace/theme/' + THEME);

export default class CodeEditor extends Component {
    render() {
        return( 
            <AceEditor width="100%" height="100%" mode="javascript" theme={THEME} name="CodeEditor" editorProps={{$blockScrolling: true}}/>
        );
    }
}