import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  child: PropTypes.bool,
  data: PropTypes.object
};

class Commit extends Component {

  getClass() {
    return this.props.data.rootCommit ? 'commit-node-root' : 'commit-node';
  }

  render() {
    if (!this.props.data) {
      return '';
    }

    const data = this.props.data;

    return (
      <div className={this.getClass()} key={data.id}>
        {!this.props.data.rootCommit ? (
          <div className='arrow-body'/>
        ) : ''}
        {data.id}
        {this.props.child ? (
          <div className='arrow-head'/>
        ) : ''}
      </div>
    );
  }
}

Commit.propTypes = propTypes;

export default Commit;
