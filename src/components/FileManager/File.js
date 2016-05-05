/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
import ReactDOM from 'react-dom';
/* jshint ignore:end */

export default class File extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'highlight': false,
      menu: false
    };
  }

  setSelected(e) {
    global.clearHighlight();
    global.clearRightMenu();
    this.highlight();
    this.props.listDirs(e);
  }

  highlight() {
    this.setState({'highlight': true});
  }

  clearHighlight() {
    this.setState({'highlight': false});
  }

  clearRightMenu() {
    this.setState({menu: false});
  }

  rightMenu(e) {
    e.preventDefault();
    global.clearRightMenu();
    this.setState({menu: true});
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={("files " + ((this.state.highlight) ? "selected" : "")) + " " + ((this.state.menu) ? "selected_outline" : "")}>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} onClick={this.props.listDirs} onClick={this.setSelected.bind(this)} onContextMenu={this.rightMenu.bind(this)}>
          <div>
            <div className="fm-left">
              <i className="fa fa-file" aria-hidden="true"/>
              <span>{this.props.name}</span>
            </div>
          </div>
        </a>
        {(this.state.menu) ? <Menu /> : ""}
      </div>
    );
  }
  /* jshint ignore:end */

}