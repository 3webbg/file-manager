/*jslint node: true */
"use strict";

var
  path = require('path'),
  Application = require('./application.js');

Application = new Application();

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    handler: Application.load
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../public/'),
        index: false
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'Routes',
  version: '1.0.0'
};
