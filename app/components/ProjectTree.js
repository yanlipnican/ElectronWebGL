import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { listFiles, fileStats, getFileTree, isDirectory } from 'utils/Utils';

export default class ProjectTree extends Component {
    
    constructor(){
        super();

        this.state = {files : []};
    }

    componentWillMount(){
        this.getFileTree();
    }

    async getFileTree(){

        let files = await getFileTree(this.props.folder);

        if(files.err){
            this.setState({files : []}); 
            // TODO handle error   
        }

        this.setState({files : files});
    }
    
    render() {

        return( 
            <ul className="fileTree no-select">
                {this.state.files.map((file, key) => {
                    return <File dir={file}/>
                })}
            </ul>
        );
    }
}

class File extends Component{
    constructor(){
        super();

        this.state = {
            expanded : false,
        }
    }

    componentWillMount() {
        this.padding = (this.props.padding || 0) + 20;
    }

    @autobind
    expand(){
        if(this.props.dir.isDir){
            this.setState({expanded : !this.state.expanded});
        }
    }

    render(){
        return (
        <li className={``}>
            <span style={{paddingLeft : this.padding}} className={`file ${this.state.expanded ? 'expanded' : ''} ${this.props.dir.isDir ? 'dir' : ''}`} onClick={this.expand}>
                <div className="overlay"></div>
                <span className="text">{this.props.dir.name}</span>
            </span>
            {this.props.dir.isDir  ?
                 
                <div style={{display : this.state.expanded ? 'initial' : 'none'}}>
                    {this.props.dir.files.map((file, key) => {
                        return <File padding={this.padding} dir={file}/>
                    })}
                </div>

            : false}
        </li>
        );
    }
}