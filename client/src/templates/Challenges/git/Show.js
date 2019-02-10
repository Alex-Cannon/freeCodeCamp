import React from 'react';
import './git.css';

import Editor from './editor.js';
import Display from './display.js';

class ShowGit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      consoleText: '',
      branch: ''
    };
  }

  setState(obj, cb) {
    this.setState(obj, cb);
  }

  render() {
    return (
      <div className='git-desktop-layout'>
        <Editor consoleText={this.state.consoleText}/>
        <Display branch={this.state.branch} />
      </div>
    );
  }
}

export default ShowGit;
