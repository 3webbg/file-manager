import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <a href="#!" className="btn"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
          <a href="#!" className="btn"><i className="fa fa-level-up" aria-hidden="true"></i></a>
          <button className="btn">New folder</button>
          <button className="btn">Delete</button>
        </div>
        <Breadcrumb/>
      </header>
    );
  }
}