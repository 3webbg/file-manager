/*jslint node: true */
"use strict";

class Parser {

  constructor(paths) {
    this.set(paths);
    this.tree();
  }

  set(paths) {
    this.paths = paths;
    this.levels = [];
    this.a = {};
  }

  /** Builds the trees from file paths */
  tree() {
    var that = this;
    this.levels = [];

    this.paths.forEach(function (value) {
      that.levels.push(that.explodeTree((value.path.split('/').filter(function (value) {return (value !== '');})), value._id, that));
    });

    return this.levels;
  }

  previous(dir) {
    dir = dir.split('/').filter(function (value) {return (value !== '');});
    dir.pop();
    return dir.join('/');
  }

  createNewFolderIn(path, e) {
    var new_folder_name = 'Untitled' + (this.paths.length);
    var new_file_name = '.meta';
    path = "/"+path+"/"+new_folder_name+"/"+new_file_name;
    path = path.replace(/\/\/+/g, '/');

    this.paths.push({_id: null, path: path});

    e.emitCreate(path, null);

    /** Rebuilds the tree */
    this.tree();

    return this.previous(this.previous(path));
  }

  rename(path, newname, dir) {
    var paths = this.paths;

    path = path.replace(/\/\/+/g, '/');
    newname = newname.replace(/\/\/+/g, '/');

    this.paths.map(function (item, i) {
      if((dir && item.path.startsWith(path + "/")) || (!dir && item.path == path)) {
        var regex = new RegExp("^("+path+")");
        paths[i].path = paths[i].path.replace(regex, newname);
      }
    });

    this.paths = paths;

    /** Rebuilds the tree */
    this.tree();
  }

  deleteFromPaths(path, dir, e) {
    var paths = this.paths;

    path = path.replace(/\/\/+/g, '/');

    this.paths.map(function (item, i) {
      if((dir && item.path.startsWith(path + "/")) || (!dir && item.path == path)) {
        e.emitDelete(paths[i].path, paths[i]._id);
        delete paths[i];
      }
    });

    this.paths = paths;

    /** Rebuilds the tree */
    this.tree();
  }

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