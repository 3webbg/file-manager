/*jslint node: true */
"use strict";

class Parser {

  /** Constructor
   *
   * @var array paths [{_id: 1, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file'}, ...]
   * @var Emitter emitter
   */
  constructor(paths, emitter) {
    this.set(paths);
    this.tree();
    this.emitter = emitter;
  }

  /** Sets paths to work with
   *
   * @var array paths [{_id: 1, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file'}, ...]
   */
  set(paths) {
    this.paths = paths;
    this.levels = [];
  }

  /** Builds the trees from file paths
   *
   *  @return array
   */
  tree() {
    var that = this;
    this.levels = [];

    this.paths.forEach(function (value) {
      that.levels.push(that.explodeTree((value.path.split('/').filter(function (value) {return (value !== '');})), value._id, that));
    });

    return this.levels;
  }

  /** Gets the previous (parent) directory of a given path
   *
   * @var string dir /tmp/tmp-dir
   * @return string /tmp
   */
  previous(dir) {
    dir = dir.split('/').filter(function (value) {return (value !== '');});
    dir.pop();
    return dir.join('/');
  }

  /** Creates a new folder with unique name
   *
   * @var string path Parent directory for the new one
   * @return string parent directory
   */
  createNewFolderIn(path) {

    /** Creates the directory & .meta file */
    path = ("/"+path+"/"+('Untitled' + (this.paths.length))+"/.meta").replace(/\/\/+/g, '/');

    this.paths.push({_id: null, path: path});

    /** Emits the create event */
    this.emitter.emitCreate(path, null);

    /** Rebuilds the tree */
    this.tree();

    return this.previous(this.previous(path));
  }

  /** Renames a directory/file
   *
   * @var string path Path to the directory/file for renaming
   * @var string newname New path to the directory/file
   * @var boolean dir Is it a directory
   */
  rename(path, newname, dir) {
    var
      paths = this.paths,
      that = this;

    path = path.replace(/\/\/+/g, '/');
    newname = newname.replace(/\/\/+/g, '/');

    this.paths.map(function (item, i) {
      if((dir && item.path.startsWith(path + "/")) || (!dir && item.path == path)) {
        var oldname = item.path;
        var regex = new RegExp("^("+path+")");
        paths[i].path = paths[i].path.replace(regex, newname);
        that.emitter.emitEdit(paths[i].path, oldname, paths[i]._id);
      }
    });

    this.paths = paths;

    /** Rebuilds the tree */
    this.tree();
  }

  /** Deletes a directory/file
   *
   * @var string path Path to the directory/file for deleting
   * @var boolean dir Is it a directory
   */
  deleteFromPaths(path, dir) {
    var
      paths = this.paths,
      that = this;

    path = path.replace(/\/\/+/g, '/');

    this.paths.map(function (item, i) {
      if((dir && item.path.startsWith(path + "/")) || (!dir && item.path == path)) {
        that.emitter.emitDelete(paths[i].path, paths[i]._id);
        delete paths[i];
      }
    });

    this.paths = paths;

    /** Rebuilds the tree */
    this.tree();
  }

  /** Gets the first existing directory of a given path
   *
   * @var string path /tmp/exists/non-existent/non-existent2/non-existent3/
   * @return string /tmp/exists/
   */
  getFirstExistingDirectory(path) {
    try {
      this.getLevel(path);
    }
    catch (e) {
      path = this.getFirstExistingDirectory(this.previous(path));
    }

    return path;
  }

  /** Returns directories & files
   *
   *  @param string dir (optional)
   *
   * If is left blank. Only root list will be returned
   *
   * ==========================================================
   *
   * If a directory is requested
   *
   * Input
   *  /tmp/dir-test/
   *
   * Output
   *   [Object { etc={...},  tmp={...}}, Object { dir-test={...},  dir-test-1={...}}, Object { qwe2={...},  qwe3={...}}]
   *
   * Each element ( Object{...} ... ) represents a column in the file manager
   */
  getLevel(dir) {

    var level = [];

    /** Builds the root level (/) */
    if(typeof dir === 'undefined' || dir === '/') {

      var obj = {};

      this.levels.forEach(function(value) {

        /** FILE */
        if(typeof value[1].path !== 'undefined') {
          obj[value[1].path] = {type: 'file', dir: '/', '_id': value[1].id};
        }

        /** DIR */
        if(typeof value[1].path === 'undefined') {
          obj[value[0]] = {type: 'dir', dir: '/', 'marked': false};
        }
      });

      level.push(obj);
    }

    /** If a directory is requested
     *
     * Input
     *  /tmp/dir-test/
     *
     * Output
     *   [Object { etc={...},  tmp={...}}, Object { dir-test={...},  dir-test-1={...}}, Object { qwe2={...},  qwe3={...}}]
     *
     * Each element ( Object{...} ... ) represents a column in the file manager
     *
     */
    else if(typeof dir === 'string') {

      var
        request = dir.split('/').filter(function (value) {return (value !== '');}),
        that = this,
        next = this.levels;

      var current_dir = '/';

      level = this.getLevel(); //the root level

      request.forEach(function(name) {

        current_dir = (current_dir.replace(/\/*$/, ''))+"/"+name+"/";

        var list = that.listDir(name, next, current_dir);

        if(Object.keys(list.obj).length === 0 && JSON.stringify(list.obj) === JSON.stringify({})) {
          throw new Error("Directory " + name + " is not found");
        }

        next = list.next;
        level.push(list.obj);
      });

      /** Marks the opened folders by the requested path */
      var dir_array = dir.split('/').filter(function (value) {return (value !== '');});
      level.forEach(function(element, key) {
        Object.keys(element).map(function (name, i) {
          if(dir_array[key] == name) {
            level[key][name].marked = true;
          }
        });
      });
    }

    return level;
  }

  /** Lists a directory from a chosen list
   *
   *  @param string request_name Name of the directory
   *  @param string inn Structure parsed like from explodeTree
   */
  listDir(request_name, inn, current_dir) {

    var next = [];
    var obj = {};

    inn.forEach(function(item) {
      var name = item[0];
      var options = item[1];

      if(name === request_name) {

        /** FILE */
        if(typeof options[1].path !== 'undefined') {
          obj[options[0]] = {type: 'file', dir: current_dir, '_id': options[1].id};
        }

        /** DIR */
        if(typeof options[1].path === 'undefined') {
          obj[options[0]] = {type: 'dir', dir: current_dir, 'marked': false};
          next.push(options);
        }
      }
    });

    return {
      'obj': obj,
      'next': next
    };
  }

  /** Parses file paths to multidimensional array (file tree) with options */
  explodeTree(parts, _id, that) {
    var r = [];

    r.push(parts.shift());
    parts.forEach(function (value, key) {

      var w = that.explodeTree(parts, _id, that);

      /** If we are on last element (file). Assign the ID and PATH props */
      r.push(((w.length === (key + 1) && w.length === 1) ? [w[0], {'id': _id, 'path': w[0]}] : w));
    });

    return r;
  }
}

export default Parser;