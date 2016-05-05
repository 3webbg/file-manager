/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Header extends React.Component {

  /* jshint ignore:start */
  render() {
    return (
      <header>
        <div className="header">{ this.props.children }</div>
      </header>
    );
  }
  /* jshint ignore:end */

}