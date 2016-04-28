import React from 'react';

export default class FilePreviewBox extends React.Component {

  constructor(props) {
    super(props);
    this.Elements = [
      {
        'test': {'type': 'file', 'id': '0'},
        'test2': {'type': 'file', 'id': '1'},
        'test3': {'type': 'file', 'id': '2'},
        'test4': {'type': 'dir', 'id': '3', 'marked': true}
      },
      {
        'test5': {'type': 'file', 'id': '4'},
        'test6': {'type': 'file', 'id': '5'},
        'test7': {'type': 'file', 'id': '6'},
        'test8': {'type': 'dir', 'id': '7', 'marked': true}
      },
      {
        'test9': {'type': 'file', 'id': '8'},
        'test10': {'type': 'file', 'id': '9'},
        'test11': {'type': 'file', 'id': '10'},
        'test12': {'type': 'dir', 'id': '11', 'marked': true}
      }
    ]
  }

  render() {
    var el = this.Elements;
    var that = this;
    return (
      <div>
        {this.Elements.map(function (element, key) {
          return (
            <div className="fm-wrapper" data-col={key}>
              {Object.keys(element).map(function (name, i) {
                var options = el[key][name];
                return (
                  <ManagerFolder key={options.id} id={options.id} options={options.id} name={name}>
                  </ManagerFolder>
                );
              })}
            </div>
          );
        })}

      </div>
    );

  }
}

class Menu extends React.Component {
  render() {
    return (
      <div className="fm-right-menu">
        <a href="#">Rename</a>
        <a href="#">Delete</a>
      </div>
    )
  }

}
class ManagerFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      menuShow: false
    };
    this.contextMenu = this.contextMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  contextMenu(e) {
    e.preventDefault();
    this.setState({menuShow: true});
  }

  handleClick(e) {
    this.setState({menuShow: false});
    this.setState({selected: true});
  }

  render() {
    return (
      <a href="#" id={this.props.id} className="fm-dir" data-row={this.props.options} onClick={this.handleClick}
         onContextMenu={this.contextMenu}>
        <div >
          <div className="fm-left">
            <i className="fa fa-file" aria-hidden="true"/>
            <span>{this.props.name}</span>
          </div>
        </div>
        {this.state.menuShow ? <Menu/> : null}
      </a>

    );
  }
}