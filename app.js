/*jslint node: true */
"use strict";

var Hapi = require('hapi');
var config = require('./config.js');
var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
});

var path = require('path');

/** Root directory of server */
config.root = path.dirname(require.main.filename);

server.connection(config.connection);

server.register([{
  register: require('good'),
  options: {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: {
        log: '*',
        response: '*'
      }
    }, {
      reporter: require('good-file'),
      events: {
        log: '*',
        response: '*'
      },
      config: './logs/log'
    }]
  }
}, {
  'register': require('vision')
}, {
  'register': require('inert')
}, {
  'register': require('./src/routes.js'),
  'options': {
    config: config
  }
}], {
}, function(error) {
  if (error) {
    require('./plugins/log.js').errorLog(error);
  } else {
    server.start(function() {

      server.views({
        engines: {
          html: require('handlebars')
        },
        path: './src/views/',
        layoutPath: './src/views/layout',
        layout: 'default',
        partialsPath: './src/views/partials',
        helpersPath: './src/views/helpers'
      });

    });
  }
});
