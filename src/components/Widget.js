/*jslint node: true */
"use strict";

/* jshint ignore:start */
import React from 'react';
import ReactDOM from 'react-dom';
import Emitter from './Emitter';
import Parser from './Parser';
import Header from './Header/Header';
import BackwardButton from './Header/BackwardButton';
import HomeButton from './Header/HomeButton';
import FileManager from './FileManager/FileManager';
import Breadcrumb from './Breadcrumb/Breadcrumb'
import NewFolderButton from './Header/NewFolderButton'
import DeleteButton from './Header/DeleteButton'
/* jshint ignore:end */

class FileManagerAPI {

  constructor(paths) {

    if (typeof paths !== 'undefined' && !Array.isArray(paths)) {
      throw new Error("Expecting array in FileManager constructor");
    }

    this.paths = ((typeof paths === 'undefined') ? [] : paths);
    this.e = new Emitter();
  }

  /** Renders the react widget */
  initialize() {

    this.parser = new Parser(this.paths);

    /* jshint ignore:start */
    ReactDOM.render(<div>
      <Header>
        <BackwardButton parser={this.parser} />
        <HomeButton />
        <NewFolderButton parser={this.parser} />
        <DeleteButton parser={this.parser} />
      </Header>
      <Breadcrumb
        parser={this.parser}
      />
      <FileManager
        emitter={this.e}
        parser={this.parser}
      />
    </div>, document.getElementById('container'));
    /* jshint ignore:end */
  }

  /** Sets paths from array
   *
   * @param array paths [/tmp/dir/dir-inner/file, /tmp/dir/dir-inner/file2, /tmp/dir/dir-inner/file3 ... ]
   */
  set(paths) {
    this.paths = paths;
    return this;
  }

  /** Gets all setted paths */
  get() {
    return this.paths;
  }

  /** Proxy to current emitter -> on */
  on(event, callback) {
    this.e.on(event, callback);
  }

  /** Proxy to current emitter */
  emitter() {
    return this.e;
  }

  /** Appends path to current path array
   *
   *  @param string path /tmp/dir/dir-inner/file ...
   */
  append(path) {
    this.paths.push(path);
    return this;
  }
}

export default FileManagerAPI;