/* jshint ignore:start */
import React from 'react';
import File from './File';
import Folder from './Folder';
import Menu from './Menu'
import FilePreview from './FilePreview';
/* jshint ignore:end */

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {
      'level': props.parser.getLevel(),
      'preview': null
    };
  }

  list(e) {
    var level = e.currentTarget.getAttribute('data-path');
    global.setBreadcrumbCurrentLevel(level);
    global.setBackwardCurrentLevel(level);
    global.setNewFolderCurrentLevel(level);
    global.setDeleteDestination(level, true);
    this.setState({'level': this.props.parser.getLevel(level)});
  }

  componentWillMount() {

    global.setFilePreview = (name) => {
      this.setState({'preview': name});
    };
    global.resetFilePreview=()=> {
      this.setState({'preview': null});
    };

    global.changeLevel = (path) => {
      this.setState({'level': this.props.parser.getLevel(path)});
    };

    global.clearHighlight = () => {
      var i = 0;
      while(i !== null) {
        if(typeof this.refs['file_ref'+i] !== 'undefined') {
          this.refs['file_ref'+i].clearHighlight();
          i++;
        } else {
          i = null;
        }
      }
    };
    global.clearRightMenu = () => {
      this._clearFileRightMenu();
      this._clearDirRightMenu();
    };
    
    global.clearRename = () => {
      this._clearFileRename();
      this._clearDirRename();
    };

  }
  _clearFileRightMenu() {
    var i = 0;
    while(i !== null) {
      if(typeof this.refs['file_ref'+i] !== 'undefined') {
        this.refs['file_ref'+i].clearRightMenu();
        i++;
      } else {
        i = null;
      }
    }
  }

  _clearDirRightMenu() {
    var i = 0;
    while(i !== null) {
      if(typeof this.refs['dir_ref'+i] !== 'undefined') {
        this.refs['dir_ref'+i].clearRightMenu();
        i++;
      } else {
        i = null;
      }
    }
  }
  _clearFileRename() {
    var i = 0;
    while(i !== null) {
      if(typeof this.refs['file_ref'+i] !== 'undefined') {
        this.refs['file_ref'+i].clearFileRename();
        i++;
      } else {
        i = null;
      }
    }
  }

  _clearDirRename() {
    var i = 0;
    while(i !== null) {
      if(typeof this.refs['dir_ref'+i] !== 'undefined') {
        this.refs['dir_ref'+i].clearFolderRename();
        i++;
      } else {
        i = null;
      }
    }
  }
  /* jshint ignore:start */
  render() {
    var
      el = this.state.level,
      that = this,
      file_index = 0,
      dir_index = 0;

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
                      ref={'dir_ref'+dir_index++}
                      id={dir_index}
                      index={dir_index}
                      key={unKey}
                      listDirs={that.list.bind(that)}
                      path={options.dir+name}
                      name={name}
                      marked={((options.marked) ? "selected" : "")}
                    >
                    </Folder> :
                    <File
                      ref={'file_ref'+file_index++}
                      index={file_index}
                      key={unKey}
                      listDirs={that.list.bind(that)}
                      path={options.dir}
                      name={name}
                      id={file_index}
                    >
                    </File>
                );
              })}
            </div>
          );
        })}
        {(this.state.preview !== null) ? <FilePreview name={this.state.preview} /> : ''}
      </div>
    );
  }
  /* jshint ignore:end */

}