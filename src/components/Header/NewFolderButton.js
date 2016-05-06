/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class NewFolderButton extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'dir': '/'};
  }

  componentWillMount() {
    global.setNewFolderCurrentLevel = (path) => {
      this.setState({'dir': path});
    };
  }

  newFolder(e) {
    e.preventDefault();

    /** Sets a path to open */
    global.setPath(this.props.parser.createNewFolderIn(this.state.dir), true);
  }

  /* jshint ignore:start */
  render() {
    return (<button className="btn" onClick={this.newFolder.bind(this)}>New folder</button>);
  }
  /* jshint ignore:end */
}