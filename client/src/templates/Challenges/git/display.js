import React, { Component } from 'react';
import { ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './tree.css';

const propTypes = {
  tree: PropTypes.object
};

class Display extends Component {
  constructor(props) {
    super(props);
  }

  renderTree() {
    d3.select('#git-display').html('');
    var data = this.parseTree();

    var width = document.getElementById('git-display').offsetWidth;
    var height = document.getElementById('git-display').offsetHeight / 1.5;

    var margin = {left: 30, top: 30, right: 30, bottom: 30};

    var svg = d3.select('#git-display').append('svg')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .attr('width', '100%')
      .attr('height', '100%');

    var g = svg.append('g')
      .attr('class', 'tree');

    var root = d3.hierarchy(data);
    console.log(root);

    var tree = d3.tree()
      .size([
        width - margin.right,
        height
      ]);

    // Draw Hierarchy lines
    g.selectAll('.link')
      .data(tree(root).links())
      .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkVertical()
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; }));

    var node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

    // Arrow
    node.append('polygon')
    .attr('points', function(d) {
      return d.data.children && d.data.children.length > 0 ?
      '-15,15 15,15 0,0' : '';
    })
    .attr('class', 'node-arrow');

    // Node
    node.append('circle')
      .attr('r', 20);
    node.append('text')
      .attr('class', 'node-text')
      .text(function(d) { return d.data.id; })
      .attr('text-anchor', 'middle');

    // Labels
    node.append('rect')
      .attr('class', function(d) {
        if (d.data.branch && d.data.head) {
          return 'node-label-big';
        }
        return d.data.branch || d.data.head ? 'node-label' : '';
      })
      .attr('width', function(d) {
        var width = 0;
        if (d.data.branch && d.data.head) {
          width = d.data.branch.length * 14;
          width = width > d.data.head.length * 14 ? width :
          d.data.head.length * 14;
        } else if (d.data.branch) {
          width = d.data.branch.length * 14;
        } else if (d.data.head) {
          width = d.data.head.length * 14;
        }
        return width;
      });
    node.append('text')
      .attr('class', 'node-label-text-branch')
      .text(function(d) {
        return d.data.branch || '';
      });
    node.append('text')
      .attr('class', 'node-label-text-head')
      .text(function(d) {
        return d.data.head || '';
      });

  }

  drawElbow() {

  }

  drawSiblingLine() {
    
  }

  parseTree() {
    let data = this.props.tree;
    let tree = {};
    let commits = Object.keys(data.commits).map((key) => {
      data.commits[key].children = [];
      return data.commits[key];
    });
    let branches = Object.keys(data.branches).map((key) => {
      return data.branches[key];
    });
    let head = data.HEAD;

    // Add head/branch data to commits[]
    for (let i = 0; i < commits.length; i++) {
      for (let k = 0; k < branches.length; k++) {
        if (branches[k].target === commits[i].id) {
          commits[i].branch = branches[k].id;

          if (head.target === branches[k].id) {
            commits[i].head = 'HEAD';
          }
        }
      }
    }

    // tree = rootCommit
    for (let i = 0; i < commits.length; i++) {
      if (commits[i].rootCommit) {
        tree = commits[i];
        commits.unshift(commits[i]);
        commits.splice(i, 1);
        i = commits.length;
      }
    }

    // For each commit, draw all children.
    function addCommitChildren(target) {
      function getNested(obj, pathArray) {
        for (let i = 0; i < pathArray.length; i++) {
          obj = obj[pathArray[i]];
        }
        return obj;
      }

      let parent = tree;
      if (target) {
        parent = getNested(tree, target);
      }

      if (!parent) {
        console.log(target);
        return;
      }

      // Add children to this parent
      for (let i = 0; i < commits.length; i++) {
        if (commits[i].parents.indexOf(parent.id) !== -1) {
          if (target) {
            getNested(tree, target).children.push(commits[i]);
          } else {
            tree.children.push(commits[i]);
          }
        }
      }

      // addCommitChildren for each child of this parent
      for (let i = 0; i < parent.children.length; i++) {
        let newTarget = target;
        if (!newTarget) {
          newTarget = ['children', i];
        } else {
          newTarget = target.slice();
          newTarget.push('children');
          newTarget.push(i);
        }

        if (parent.id === 'C1') {
          console.log('> C1 [' + i + ']');
          console.log('Expected: children[0].children[' + i + ']');
          console.log('Actual: ' + JSON.stringify(target));
        }

        addCommitChildren(newTarget);
      }
    }

    addCommitChildren(false);

    return tree;
  }

  componentDidMount() {
    this.renderTree();
    window.addEventListener('resize', this.renderTree.bind(this));
  }

  componentDidUpdate() {
    this.renderTree();
  }

  render() {
    return (
      <ReflexElement flex={1}>
        <div id='git-display'/>
      </ReflexElement>
    );
  }
}

Display.propTypes = propTypes;

export default Display;
