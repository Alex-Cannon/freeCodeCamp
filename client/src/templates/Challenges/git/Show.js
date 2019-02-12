import React from 'react';
import { ReflexContainer, ReflexSplitter } from 'react-reflex';
import PropTypes from 'prop-types';

import Editor from './editor.js';
import Display from './display.js';
import './git.css';

const propTypes = {
  resizeProps: PropTypes.shape({
    onStopResize: PropTypes.func,
    onResize: PropTypes.func
  })
};

class ShowGit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      consoleText: '',
      consoleOutput: ['git commit'],
      tree: JSON.parse('{"branches":{"master":{"target":"C1","id":"master"}},"commits":' +
      '{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents"' +
      ':["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}'),
      goalTree: '{"branches":{"master":{"target":"C3","id":"master"}},' +
      '"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":' +
      '{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"' +
      'C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"master","id' +
      '":"HEAD"}}'
    };
  }

  render() {
    const {
      resizeProps
    } = this.props;

    return (
      <ReflexContainer className='git-desktop-layout' orientation='vertical'>
        <Editor
          globals={this.state}
          setState={this.setState.bind(this)}
          {...resizeProps}
        />
        <ReflexSplitter {...resizeProps}/>
        <Display
          globals={this.state}
          {...resizeProps}
        />
      </ReflexContainer>
    );
  }
}

ShowGit.propTypes = propTypes;

export default ShowGit;
