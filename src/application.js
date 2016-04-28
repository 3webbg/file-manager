/*jslint node: true */
"use strict";

var
  Application = function() {};

Application.prototype.load = function(request, reply) {
  var data = {};
  return reply.view('index', data);
};

module.exports = Application;
