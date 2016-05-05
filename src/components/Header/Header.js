/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Header extends React.Component {

  /* jshint ignore:start */
  render() {
    return (
      <header>
        <div className="header">
          { this.props.children }
          <button className="btn">New folder</button>
          <button className="btn">Delete</button>
        </div>
      </header>
    );
  }
  /* jshint ignore:end */

}