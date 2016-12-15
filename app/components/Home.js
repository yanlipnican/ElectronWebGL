// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Block from './Flex/Block';

import {Canvas} from 'components/canvas';
import {Tabs, Tab} from 'components/Tabs/Tabs';
import CodeEditor from 'components/CodeEditor';
import ProjectTree from 'components/ProjectTree';
import Hierarchy from 'components/Hierarchy';

export default class Home extends Component {
  render() {
    return (
      <div className="Root">
        <Block direction="column" disableResize>
          <Block direction='row'>
            <Block width="300px" direction="column" disableResize>
              <Tabs id="left-window">
                <Tab title="Hierarchy">
                  <Hierarchy />
                </Tab>
                <Tab title="Explorer" scrollable>
                  <ProjectTree folder={`/home/lipnican/Workspace/ElectronWebGL/app/`}/>
                </Tab>
                <Tab title="Sprites">
                  content 3
                </Tab>
              </Tabs>
            </Block>
            <Block direction="column">
              <Block direction="column" disableResize >
                <Block height="auto">
                  <div className="menu-horizontal center">
                    <span className="item">
                      {`<`}
                    </span>
                    <span className="item">
                      {`>`}
                    </span>
                    <span className="item">
                      {`II`}
                    </span>
                  </div>
                </Block>
                <Block direction='row'>
                  <Tabs id="middleWindow">
                    <Tab title="Game">
                      <Canvas width="1280" height="720"/>
                    </Tab>
                    <Tab title="Code">
                       <CodeEditor/>
                    </Tab>
                  </Tabs>
                </Block>
              </Block>
              <Block height="260px">
                <Tabs id="BottomWindow">
                  <Tab title="Output">
                  </Tab>
                </Tabs>
              </Block>
            </Block>
            <Block width="400px">
              <Tabs id="rightwindow">
                <Tab title="Inspector">

                </Tab>
              </Tabs>
            </Block>
          </Block>
          <Block height="auto">
            <div className="BottomRow">
              Version 0.0.1 - Buggyman
            </div>
          </Block>
        </Block>
      </div>
    );
  }
}
