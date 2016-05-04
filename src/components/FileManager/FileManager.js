/* jshint ignore:start */
import React from 'react';
import File from './File';
import Folder from './Folder';
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