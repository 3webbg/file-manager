/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Folder extends React.Component {

  constructor(props) {
    super(props);
  }
  setSelected(e){
    var index = this.props.index;
    this.props.highlight(index);
    this.props.listDirs(e);
  }
  /* jshint ignore:start */
  render() {
    return (
      <div >
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