/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class HomeButton extends React.Component {

  home(e) {
    e.preventDefault();
    global.setBreadcrumbCurrentLevel('/');
    global.setBackwardCurrentLevel('/');
    global.clearHighlight();
    global.changeLevel('/');
  }

  render() {
    return (<a href="#!" className="btn" onClick={this.home.bind(this)}><i className="fa fa-level-up" aria-hidden="true"></i></a>);
  }
}