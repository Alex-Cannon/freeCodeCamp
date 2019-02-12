import React, { Component } from 'react';
import { ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';
import './tree.css';

const propTypes = {
  globals: {
    tree: PropTypes.String,
    goalTree: PropTypes.String
  }
};


class Display extends Component {
  constructor(props) {
    super(props);
  }

  renderTree() {
    let commits = this.props.globals.tree.commits;
    console.log(Object.keys(commits));
    let nodes = Object.keys(commits).map((key) => {
      return <div className='commit-node'>{key}</div>;
    });
    return <div>{nodes}</div>;
  }

  render() {
    return (
      <ReflexElement className='git-display' flex={1}>
        {this.renderTree()}
      </ReflexElement>
    );
  }
}

Display.propTypes = propTypes;

export default Display;
