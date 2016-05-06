/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
/* jshint ignore:end */

export default class Folder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false
    };
  }

  setSelected(e){
    global.clearHighlight();
    global.clearRightMenu();
    global.setDeleteDestination(e.currentTarget.getAttribute('data-path'), true);
    this.props.listDirs(e);
  }

  clearRightMenu() {
    this.setState({
      menu: false
    });
  }

  rightMenu(e) {
    e.preventDefault();
    global.clearRightMenu();
    this.setSelected(e);
    this.setState({menu: true});
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={this.props.marked + " " + ((this.state.menu) ? "selected_outline" : "")}>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} onClick={this.setSelected.bind(this)} onContextMenu={this.rightMenu.bind(this)}>
          <div >
            <div className="fm-left">
              <i className="fa fa-folder" aria-hidden="true"/>
              <span>{this.props.name}</span>
            </div>
          </div>
        </a>
        {(this.state.menu) ? <Menu destination={this.props.path} /> : ""}
      </div>
    );
  }
  /* jshint ignore:end */

}