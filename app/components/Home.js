// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import { Button } from 'antd';
import { Block } from './Flex/Block';

export default class Home extends Component {
  render() {
    return (
      <div className="Root">
        <Block direction="column" disableResize>
          <Block direction='row'>
            <Block width="300px" direction="column" disableResize>
              <Block height="auto" disableResize>
                <div className="project-name">
                  Test Game
                </div>
              </Block>
              <Block>
                <div className="Project-tree">
                  File tree - /
                  
                </div>
              </Block>
            </Block>
            <Block direction="column">
              <Block direction="column" disableResize>
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

                  <Block>
                    <div className="GameWindow">

                    </div>
                  </Block>

                </Block>
              </Block>
              <Block height="300px">
                <div className="Console">
                    [1572] ./~/rc-upload/~/warning/browser.js 1.81 kB {0}<br/>
                    [1573] ./~/antd/lib/upload/uploadList.js 8.8 kB {0}<br/>
                    [1574] ./~/antd/lib/upload/getFileItem.js 454 bytes {0}<br/>
                    [1575] ./app/store/configureStore.js 265 bytes {0}<br/>
                    [1576] ./app/store/configureStore.development.js 1.75 kB {0}<br/>
                    [1577] ./~/redux-thunk/lib/index.js 529 bytes {0}<br/>
                    [1578] ./~/redux-logger/lib/index.js 3.89 kB {0}<br/>
                    [1579] ./~/redux-logger/lib/core.js 4.73 kB {0}<br/>
                    [1580] ./~/redux-logger/lib/helpers.js 741 bytes {0}<br/>
                    [1581] ./~/redux-logger/lib/diff.js 1.8 kB {0}<br/>
                    [1582] ./~/deep-diff/index.js 11.5 kB {0}<br/>
                    [1583] ./~/redux-logger/lib/defaults.js 949 bytes {0}<br/>
                    [1584] ./app/reducers/index.js 332 bytes {0}<br/>
                    [1585] ./app/app.global.less 1.04 kB {0}<br/>
                    [1586] ./~/css-loader!./~/less-loader!./app/app.global.less 350 kB {0} [built]<br/>

                </div>
              </Block>

            </Block>
            <Block width="400px">
              Detail of gameObject
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
