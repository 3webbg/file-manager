/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'destination': null};
  }

  componentWillMount() {
    global.setDeleteDestination = (destination) => {
      this.setState({'destination': destination});
      return this;
    };

    global.clearDeleteDestination = () => {
      this.clearDeleteDestination();
    };
  }

  clearDeleteDestination() {
    this.setState({'destination': null});
  }

  deleteDestination(e) {
    e.preventDefault();
    global.clearRightMenu();
    this.forceDelete();
    global.clearDeleteDestination();
  }

  forceDelete() {
    alert('Delete destination ' + this.state.destination);
  }

  render() {
    return (<button className="btn" onClick={this.deleteDestination.bind(this)} disabled={(this.state.destination === null)}>Delete</button>);
  }
}