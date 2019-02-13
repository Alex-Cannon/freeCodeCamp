import React, { Component } from 'react';
import { ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';
import './tree.css';

import Commit from './commit.js';

const propTypes = {
  data: PropTypes.object
};

class Display extends Component {
  constructor(props) {
    super(props);
  }

  renderTree() {
    let commits = this.props.data.tree.commits;
    let nodes = [];

    Object.keys(commits).map((key, i, arr) => {
      const data = commits[key];
      if (data.rootCommit) {
        return nodes.push(
          <Commit child={true} data={data} key={'dk' + i}/>
        );
      }

      // Add arrow to previous commit
      nodes.push(
        <Commit
          child={i + 1 < arr.length ? true : false}
          data={data}
          key={'dk' + i}
        />
      );
      return '';
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
