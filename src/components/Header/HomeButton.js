/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class HomeButton extends React.Component {

  home(e) {
    e.preventDefault();

    /** Sets a path to open */
    global.setPath('/', true);
  }

  /* jshint ignore:start */
  render() {
    return (<a href="#!" className="btn" onClick={this.home.bind(this)}><i className="fa fa-level-up" aria-hidden="true"></i></a>);
  }
  /* jshint ignore:end */
}