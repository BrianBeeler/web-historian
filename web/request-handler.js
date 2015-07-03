var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method==="GET") {
    httpHelpers.GET(req,res);
  }
  else if (req.method==="POST") {
    httpHelpers.POST(req,res);
  }
  else if (req.method==="OPTIONS") {
    httpHelpers.OPTIONS(req,res);
  }

  // res.end(archive.paths.list);
};
