/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
/* jshint ignore:end */

export default class File extends React.Component {

  constructor(props) {
    super(props);

  }
  setSelected(){
    var index = this.props.index;
    this.props.highlight(index);
  }
  /* jshint ignore:start */
  render() {
    return (
      <div>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} onClick={this.props.listDirs} onClick={this.setSelected.bind(this)}>
          <div>
            <div className="fm-left">
              <i className="fa fa-file" aria-hidden="true"/>
              <span>{this.props.name}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
  /* jshint ignore:end */

}