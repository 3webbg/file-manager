/*jslint node: true */
"use strict";

class Emitter {
  constructor() {
    var e = require('event-emitter');
    this.emitter = new e({});
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  off(event, listener) {
    this.emitter.off(event, listener);
  }

  once(event, callback) {
    this.emitter.once(event, callback);
  }

  emitDelete(name, key) {
    this.emitter.emit('delete', name, key);
  }

  emitCreate(name, key) {
    this.emitter.emit('create', name, key);
  }

  emitEdit(name, oldname, key) {
    this.emitter.emit('edit', name, oldname, key);
  }

  emitNavigate(name, isdir) {
    this.emitter.emit('navigate', name, isdir);
  }
}

export default Emitter;