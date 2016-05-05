/* jshint ignore:start */
import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb'
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
        <Breadcrumb/>
      </header>
    );
  }
  /* jshint ignore:end */

}