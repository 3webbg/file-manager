/* jshint ignore:start */
import React from 'react';
import File from './File';
import Folder from './Folder';
import ReactDOM from 'react-dom';
import Menu from './Menu'
/* jshint ignore:end */

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {
      'level': props.parser.getLevel(),
      'selected': -1,
      'rightClicked': -1
    };
    this.list = this.list.bind(this);
  }
    highlight(index){
      var currentIndex = index;
      if(this.state.selected !== -1) {
        ReactDOM.findDOMNode(this.refs['file' + this.state.selected]).className ='files';
      }

      if(this.state.selected === index && currentIndex != index) {
        this.setState({selected: -1});
      }
      else {
        ReactDOM.findDOMNode(this.refs['file' + index]).className = 'files selected';
        this.setState({selected: index});
      }
    }
  list(e) {
    this.setState({'level': this.props.parser.getLevel(e.currentTarget.getAttribute('data-path'))});
  }

  /* jshint ignore:start */
  render() {
    var
      el = this.state.level,
      that = this,
      index = 0;

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
                      ref={'file' + index}
                      index={index++}
                      highlight={that.highlight.bind(that)}
                      key={unKey}
                      listDirs={that.list}
                      path={options.dir+name}
                      name={name}>
                    </Folder> :
                    <File
                      ref={'file' + index}
                      index={index++}
                      highlight={that.highlight.bind(that)}
                      key={unKey}
                      listDirs={that.list}
                      path={options.dir}
                      name={name}
                      id={options.id}>
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