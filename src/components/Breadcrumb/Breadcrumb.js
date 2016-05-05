import React from 'react';

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'previous': '/'};
  }
  
  componentWillMount() {
    global.setBreadcrumbCurrentLevel = (path) => {
      this.setState({'previous': path});
    };
  }

  changeLevel(e) {
    e.preventDefault();
    var prev = e.currentTarget.getAttribute('data-path');
    global.setBreadcrumbCurrentLevel(prev);
    global.setBackwardCurrentLevel(prev);
    global.changeLevel(prev);
  }

  render() {
    var path = this.state.previous;
    var pathsArr = path.split('/').filter(function (value) {return (value !== '');});
    var that = this;
    var tmp_path = '/';

    pathsArr.unshift('/');

    /* jshint ignore:start */
    return (
      <div className="breadcrumb-nav">
        {pathsArr.map(function (pathName, i) {

          tmp_path = (tmp_path.replace(/\/*$/, ''))+"/"+pathName;

          return(
              <div className="breadcrumb-link-outer">
                <a href="#" data-path={tmp_path} id={i} className="breadcrumb-link" onClick={that.changeLevel.bind(that)}>{pathName}</a> {((pathsArr.length > 1 && ((pathsArr.length-1) != i)) ? <span>&nbsp;>&nbsp;</span> : "")}
              </div>
          );
        })}

      </div>
    );
    /* jshint ignore:end */

  }
}