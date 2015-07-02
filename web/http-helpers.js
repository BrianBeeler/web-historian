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
  var filename = archive.paths.siteAssets + '/index.html';
  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(res);
}


exports.POST = function(req,res) {
  exports.collectData(req, function(data) {
    if ( archive.isUrlInList(data, function(bool) {
      console.log(data + " : " + bool);
    }) ) {
      //if request url exists in our archive, serve archived html page
      var filename = archive.paths.archivedSites + '/' + data;
      var fileStream = fs.createReadStream(filename);
      // exports.sendStatusCode(res, 404);
      fileStream.pipe(res);
    }
    else {
      //else, add request url to list
      archive.addUrlToList(data, function(err) {
        if (err) throw err;
      });
      // and tell htmlfetcher to archive that html page

    }
  });
  // var filename = path.join(process.cwd(),uri);


}

exports.OPTIONS = function(req,res) {
  // send 200 status code

}

exports.collectData = function(req, callback) {
  var data = "";
  req.on('data', function(chunk) {
    data+=chunk;
  })

  req.on('end', function() {
    data = data.toString()
    callback(data);
  })
}

exports.sendStatusCode = function (res, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(res, exports.headers);
}

// As you progress, keep thinking about what helper functions you can put here!
