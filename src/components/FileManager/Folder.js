/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Folder extends React.Component {

  constructor(props) {
    super(props);
  }

  setSelected(e){
    global.clearHighlight();
    global.clearRightMenu();
    this.props.listDirs(e);
  }

  clearRightMenu() {
    console.log("Clear right menu");
  }

  rightMenu() {
    global.clearRightMenu();
    console.log("Add right menu");
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={this.props.marked}>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} onClick={this.setSelected.bind(this)}>
          <div >
            <div className="fm-left">
              <i className="fa fa-folder" aria-hidden="true"/>
              <span>{this.props.name}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
  /* jshint ignore:end */

}