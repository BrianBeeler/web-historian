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
    httpHelpers.collectData(req, function(data) {
      console.log(data);
    });
    httpHelpers.POST(req,res);
  }
  else if (req.method==="OPTIONS") {
    httpHelpers.OPTIONS(req,res);
  }





  //var uri = url.parse(req.url).pathname;

  //if req.method === get
    //httpHelpers.get(req,res)

  // else if (post)
    //httpHelpers.post(req,res)

  // else (options)
    // httphelpers.options




  //res.end(archive.paths.list);
};
