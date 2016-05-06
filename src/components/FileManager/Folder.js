/* jshint ignore:start */
import React from 'react';
import Menu from './Menu';
import ReactDOM from 'react-dom';
/* jshint ignore:end */

export default class Folder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      rename: false,
      value: this.props.name
    };
  }

  setSelected(e){
    global.clearHighlight();
    global.clearRightMenu();
    global.setDeleteDestination(e.currentTarget.getAttribute('data-path'), true);
    this.props.listDirs(e);
    global.resetFilePreview();
  }
  setRename() {
    this.setState({rename: true});
  }
  saveRename(e) {
    if (e.key === 'Enter') {
      var newName = ReactDOM.findDOMNode(this.refs.inputVal).value;
      console.log(newName);
      this.clearFolderRename();
    }
  }
  handleChange(e){
    this.setState({value: e.target.value});
  }
  clearRightMenu() {
    this.setState({
      menu: false
    });
  }

  clearFolderRename() {
    this.setState({
      rename: false
    });
  }
  componentDidMount() {
    var width = $('.fm-wrapper').length;
    $('body').css("width",""+(220*width+300)+"px");
    console.log(width);
  }
  rightMenu(e) {
    e.preventDefault();
    global.clearRightMenu();
    global.clearRename();
    global.setDeleteDestination(e.currentTarget.getAttribute('data-path'), true);
    this.setState({menu: true});
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className={this.props.marked + " " + ((this.state.menu) ? "selected_outline" : "")}>
        <a href="#" id={this.props.id} className="fm-dir files" data-path={this.props.path} onClick={this.setSelected.bind(this)} onContextMenu={this.rightMenu.bind(this)}>
            <div className="fm-left">
              <i className="fa fa-folder" aria-hidden="true"/>
              {(this.state.rename ? <input type="text" ref="inputVal" value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.saveRename.bind(this)}/> : <span>{this.props.name}</span>)}
            </div>
            <i className="fa fa-caret-right" aria-hidden="true"/>
        </a>
        {(this.state.menu) ? <Menu onRename={this.setRename.bind(this)} isdir={true} onSave={this.saveRename.bind(this)} destination={this.props.path} /> : ""}
      </div>
    );
  }
  /* jshint ignore:end */

}