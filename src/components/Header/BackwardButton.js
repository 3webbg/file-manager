/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class BackwardButton extends React.Component {

  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'previous': '/'};
  }

  backwards(e) {
    e.preventDefault();
    global.setPath(this.props.parser.previous(e.currentTarget.getAttribute('data-path')), true);
  }

  componentWillMount() {
    global.setBackwardCurrentLevel = (path) => {
      this.setState({'previous': path});
    };
  }

  /* jshint ignore:start */
  render() {
    return (<a href="#!" className="btn" onClick={this.backwards.bind(this)} data-path={this.state.previous}><i className="fa fa-angle-left" aria-hidden="true"></i></a>);
  }
  /* jshint ignore:end */
}