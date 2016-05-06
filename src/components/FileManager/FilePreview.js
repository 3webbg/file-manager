import React from 'react';

export default class FilePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="file-preview">
        <i className="fa fa-file"/>
        <span>{this.props.name}</span>
      </div>
    );
  }
}