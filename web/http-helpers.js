var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');
var url = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  //



};


exports.GET = function (req,res) {
  //Serve index.html
}


exports.POST = function(req,res) {
  //If request url exists in our archive, serve archived html page
  //Else, add request url to list and tell htmlfetcher to archive that html page
}

exports.OPTIONS = function(req,res) {
  // send 200 status code

}

// As you progress, keep thinking about what helper functions you can put here!
