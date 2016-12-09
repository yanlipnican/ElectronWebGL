import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';

interface AppProps {
    
}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {
    
    constructor() {
        super()
    }

    render() {
        return (
            <h1>Hello world! - react</h1>
        );
    }

}

async function nigger() {

};

// initialise app
document.addEventListener('DOMContentLoaded', function(event) { 
    ReactDOM.render(<App />, document.querySelector('#app'));
});