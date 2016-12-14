import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { listDirectory, fileStats, getFileTree, isDirectory, readFile } from 'utils/Utils';

export default class ProjectTree extends Component {
    
    constructor(){
        super();

        this.state = {  
            files : [],
            loading : false,
            error : false
        };
    }

    componentWillMount(){
        this.getFileTree();
    }

    async getFileTree(){
        this.setState({loading : true, error : false});
        
        let files = await getFileTree(this.props.folder);
        
        this.setState({loading : false});
        
        if(files.error){
            this.setState({files : [], error : true});
        }
        
        this.setState({files : files});
    }
    
    render() {

        if(this.state.error){
            return <div className="fileTree no-select error">Error directory "{this.props.folder}" doesnt exist.</div>
        }

        if(this.state.loading){
            return <div className="fileTree no-select loading">Loading files...</div>
        }

        return( 
            <ul className="fileTree no-select">
                {this.state.files.map((file, key) => {
                    return <File dir={file} key={key}/>
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

    @autobind
    async openFile(){
        console.log(await readFile(this.props.dir.path));
    }

    render(){

        return (
        <li className={``}>
            <span 
                style={{paddingLeft : this.padding}} 
                className={`file ${this.state.expanded ? 'expanded' : ''} ${this.props.dir.isDir ? 'dir' : ''}`} 
                onClick={this.props.dir.isDir ? this.expand : this.openFile}
            >
                <div className="overlay"></div>
                <span className="text">{this.props.dir.name}</span>
            </span>
            {this.props.dir.isDir  ?
                 
                <ul style={{display : this.state.expanded ? 'initial' : 'none'}}>
                    {this.props.dir.files.map((file, key) => {
                        return <File key={key} padding={this.padding} dir={file}/>
                    })}
                </ul>

            : false}
        </li>
        );
    }
}