/* jshint ignore:start */
import React from 'react';
import File from './File';
import Folder from './Folder';
import Menu from './Menu'
/* jshint ignore:end */

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {
      'level': props.parser.getLevel()
    };
  }

  list(e) {
    var level = e.currentTarget.getAttribute('data-path');
    global.setCurrentLevel(level);
    this.setState({'level': this.props.parser.getLevel(level)});
  }

  componentWillMount() {

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
      </div>
    );
  }
  /* jshint ignore:end */

}