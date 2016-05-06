/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'destination': null, 'isdir': false};
  }

  componentWillMount() {
    global.setDeleteDestination = (destination, dir) => {
      this.setState({'destination': destination, 'isdir': dir});
      return this;
    };

    global.clearDeleteDestination = () => {
      this.clearDeleteDestination();
    };
  }

  clearDeleteDestination() {
    this.setState({'destination': null, 'isdir': false});
  }

  deleteDestination(e) {
    e.preventDefault();
    global.clearRightMenu();
    this.forceDelete();
    global.clearDeleteDestination();
  }

  forceDelete() {
    this.props.parser.deleteFromPaths(this.state.destination, this.state.isdir, this.props.emitter);
    var level = this.props.parser.getFirstExistingDirectory(this.state.destination);
    global.setBreadcrumbCurrentLevel(level);
    global.setBackwardCurrentLevel(level);
    global.setNewFolderCurrentLevel(level);
    global.setDeleteDestination(level, true);
    global.changeLevel(level);
  }

  render() {
    return (<button className="btn" onClick={this.deleteDestination.bind(this)} disabled={(this.state.destination === null)}>Delete</button>);
  }
}