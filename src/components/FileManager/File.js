/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
import ReactDOM from 'react-dom';
/* jshint ignore:end */

export default class File extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'highlight': false};
  }

  setSelected(e) {
    this.highlight();
    this.props.listDirs(e);
  }

  highlight() {
    global.clearHighlight();
    this.state = {'highlight': true};
  }

  clearHighlight() {
    this.state = {'highlight': false};
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={("files " + ((this.state.highlight) ? "selected" : ""))}>
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