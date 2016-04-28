/*jslint node: true */
"use strict";

module.exports = function(grunt) {

  var webpack = require('webpack');

  grunt.initConfig({
    jsbeautifier: {
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'package.json',
        'app.js'
      ],
      options: {
        js: {
          indentSize: 2,
          maxPreserveNewlines: 2
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'src/**/*.js',
          'package.json',
          'app.js'
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: ['node_modules/**', 'test/**']
        }
      }
    },

    webpack: {
      build: {
        progress: true,
        entry: {
          app: './src/components/Widget.js'
        },
        output: {
          path: './public/assets/dist/js',
          filename: 'file-manager.widget.js',
          library: 'FileManager'
        },
        module: {
          loaders: [
          {
            test: /event-emitter/,
            loader: 'imports?define=>false&this=>window'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              "plugins": [
                "add-module-exports"
              ]
            }
          }]
        },
        resolve:{
          extenstions: ['', '.js'],
          modulesDirectories: ['node_modules'],
          alias:{
            "eventEmitter/EventEmitter": "wolfy87-eventemitter"
          }
        },
        watch: true,
        keepalive: true
      }
    },

    concat: {
      dist: {
        src: ['src/components/**/*.scss'],
        dest: 'public/assets/dist/css/build.scss'
      }
    },

    sass: {
      dist: {
        files: {
          'public/assets/dist/css/build.css': 'public/assets/dist/css/build.scss'
        }
      }
    },

    watch: {
      sass: {
        files: ['./src/components/**/*.scss'],
        tasks: ['concat', 'sass']
      },
      //"jsbeautifier": {
      //  files: ["./src/**/*.js"],
      //  tasks: ['jsbeautifier'],
      //  options: {
      //    js: {
      //      indentSize: 5
      //    }
      //  }
      //},
      "jshint": {
        files: ["./src/**/*.js"],
        tasks: ['jshint']
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'webpack', 'sass', ['concat', 'sass'], 'watch']
      },
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [
    ['jsbeautifier', 'jshint'], 'webpack', 'sass', ['concat', 'sass'], 'concurrent:target:watch'
  ]);
  grunt.registerTask('start', ['concurrent']);
};
