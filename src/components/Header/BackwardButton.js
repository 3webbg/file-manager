/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class BackwardButton extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'previous': '/'};
  }

  backwards(e) {
    e.preventDefault();
    var prev = this.props.parser.previous(e.currentTarget.getAttribute('data-path'));
    global.setBreadcrumbCurrentLevel(prev);
    global.setBackwardCurrentLevel(prev);
    global.setNewFolderCurrentLevel(prev);
    global.setDeleteDestination(prev, true);
    global.clearHighlight();
    global.changeLevel(prev);
  }

  componentWillMount() {
    global.setBackwardCurrentLevel = (path) => {
      this.setState({'previous': path});
    };
  }

  render() {
    return (<a href="#!" className="btn" onClick={this.backwards.bind(this)} data-path={this.state.previous}><i className="fa fa-angle-left" aria-hidden="true"></i></a>);
  }
}