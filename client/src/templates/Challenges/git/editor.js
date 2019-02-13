import React, { Component } from 'react';
import { ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.object,
  setState: PropTypes.func
};

class Editor extends Component {

  submitCommand(e) {
    e.preventDefault();
    let output = this.props.data.consoleOutput;
    output.push(this.props.data.consoleText);
    this.props.setState({consoleOutput: output});
  }

  handleConsole(e) {
    this.props.setState({consoleText: e.target.value});
  }

  renderOutput() {
    let output = this.props.data.consoleOutput;
    return output.map((command) => {
      return (
        <div key={command}>
          <span className='money'>$</span> {command} <br/>
        </div>);
    });
  }

  render() {
    return (
      <ReflexElement className='git-terminal' flex={1}>
        <div className='toolbar box vertical center'>
          <div className='toolbar-btns'>
            <div className='box close-bit'/>
            <div className='box minimize-bit'/>
            <div className='box plus-bit'/>
          </div>
          <div className='toolbar-title'>
            <span>
              Learn Git Branching
            </span>
          </div>
        </div>
        <div className='git-editor-body'>
          <div className='git-editor-output'>
            {this.renderOutput()}
          </div>
          <form
            className='console-form'
            onSubmit={this.submitCommand.bind(this)}
            >
            <span className='money'>$</span>
            <input
              className='console-input'
              onChange={this.handleConsole.bind(this)}
              placeholder='Enter Command'
              type='text'
              value={this.props.data.consoleText}
            />
          </form>
        </div>
      </ReflexElement>
    );
  }
}

Editor.propTypes = propTypes;

export default Editor;
