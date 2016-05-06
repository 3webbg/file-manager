/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class FilePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  /* jshint ignore:start */
  render () {
    return (
      <div className="file-preview">
        <i className="fa fa-file"/>
        <span>{this.props.name}</span>
      </div>
    );
  }
  /* jshint ignore:end */
}