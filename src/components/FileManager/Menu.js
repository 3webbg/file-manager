/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  renameItem(e) {
    global.clearRightMenu();
    alert('Rename ' + this.props.destination);
  }

  deleteItem(e) {
    global.clearRightMenu();
    global.setDeleteDestination(this.props.destination, true).forceDelete();
    global.clearDeleteDestination();
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className="fm-right-menu menu">
        <a href="#" onClick={this.renameItem.bind(this)}>Rename</a>
        <a href="#" onClick={this.deleteItem.bind(this)}>Delete</a>
      </div>
    );
  }
  /* jshint ignore:end */

}