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
      menu: false,
      rename: false,
      value: this.props.name
    };
  }
  setSelected(e) {
    var file = (e.currentTarget.getAttribute('data-path'))+(e.currentTarget.getAttribute('data-name'));
    global.clearHighlight();
    global.clearRightMenu();
    this.highlight();
    this.props.listDirs(e);
    global.setDeleteDestination(file, false);
    global.setBreadcrumbCurrentLevel(file);
  }
  setRename() {
    this.setState({rename: true});
  }
  saveRename(e) {
    if (e.key === 'Enter') {
      var newName = ReactDOM.findDOMNode(this.refs.inputVal).value;
      console.log(newName);
      this.clearFileRename();
    }
  }
  clearFileRename() {
    this.setState({
      rename: false
    });
  }
  handleChange(e){
    this.setState({value: e.target.value});
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
    global.clearRename();
    this.setState({menu: true});
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={("files " + ((this.state.highlight) ? "selected" : "")) + " " + ((this.state.menu) ? "selected_outline" : "")}>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} data-name={this.props.name} onClick={this.setSelected.bind(this)} onContextMenu={this.rightMenu.bind(this)}>
          <div>
            <div className="fm-left">
              <i className="fa fa-file" aria-hidden="true"/>
              {(this.state.rename ? <input type="text" ref="inputVal" value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.saveRename.bind(this)}/> : <span>{this.props.name}</span>)}
            </div>
          </div>
        </a>
        {(this.state.menu) ? <Menu onRename={this.setRename.bind(this)} destination={this.props.path + this.props.name} /> : ""}
      </div>
    );
  }
  /* jshint ignore:end */

}