/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'level': props.parser.getLevel()};
    this.list = this.list.bind(this);
  }

  list(e) {
    this.setState({'level': this.props.parser.getLevel(e.currentTarget.getAttribute('data-path'))});
  }

  /* jshint ignore:start */
  render() {
    var
      el = this.state.level,
      that = this;

    return (
      <div>
        {el.map(function (element, key) {
          return (
            <div className="fm-wrapper" data-col={key}>
              {Object.keys(element).map(function (name, i) {
                var
                  options = el[key][name],
                  unKey = (key.toString() + i.toString());

                return (
                  options.type == 'dir' ?
                    <Folder
                      key={unKey}
                      onClick={that.list}
                      path={options.dir+name}
                      name={name}
                    /> :
                    <File
                      key={unKey}
                      onClick={that.list}
                      path={options.dir}
                      name={name}
                      id={options.id}
                    />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  /* jshint ignore:end */

}

class Menu extends React.Component {

  /* jshint ignore:start */
  render() {
    return (
      <div className="fm-right-menu">
        <a href="#">Rename</a>
        <a href="#">Delete</a>
      </div>
    );
  }
  /* jshint ignore:end */

}

class File extends React.Component {

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

class Folder extends React.Component {
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
            <i className="fa fa-folder" aria-hidden="true"/>
            <span>{this.props.name}</span>
          </div>
        </div>
        {this.state.menuShow ? <Menu/> : null}
      </a>
    );
  }
  /* jshint ignore:end */

}