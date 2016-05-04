/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
/* jshint ignore:end */

export default class File extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      menuShow: false
    };
    this.contextMenu = this.contextMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  contextMenu(e) {
    e.preventDefault();
    this.setState({menuShow: true});
  }

  handleClick() {
    this.setState({menuShow: false});
    this.setState({selected: true});
  }

  /* jshint ignore:start */
  render() {
    return (
      <a href="#" id={this.props.id} className="fm-dir" data-path={this.props.path} onClick={this.props.onClick}
         onContextMenu={this.contextMenu}>
        <div >
          <div className="fm-left">
            <i className="fa fa-file" aria-hidden="true"/>
            <span>{this.props.name}</span>
          </div>
        </div>
        {this.state.menuShow ? <Menu/> : null}
      </a>
    );
  }
  /* jshint ignore:end */

}