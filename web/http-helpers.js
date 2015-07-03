var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');
var urlParser = require('url');

var headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: "utf8"};
  fs.readFile(archive.paths.siteAssets + asset, encoding, function (err, data) {
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, encoding, function (err, data) {
        if (err) {
          callback ? callback() : exports.sendResponse(res, "File Not Found", 404);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};

exports.sendRedirect = function (res,location,statusCode) {
  statusCode = statusCode || 302;
  res.writeHead(statusCode,{ Location: location });
  res.end();
}

exports.GET = function (req,res) {
  var parts = urlParser.parse(req.url);
  var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
  exports.serveAssets(res, urlPath, function () {
    archive.isUrlInList(urlPath, function(found) {
      if (found) {
        exports.sendRedirect(res, "/loading.html");
      } else  {
        exports.sendResponse(res, "File not found", 404);
      }
    })
  })
}



exports.POST = function(req,res) {
  exports.collectData(req, function(data) {
    var urlPath = data.split('=')[1];
    archive.isUrlInList(urlPath, function(found) {
      if (found) {
        archive.isUrlArchived(urlPath, function(exists) {
          if (exists) {
            exports.sendRedirect(res,"/"+ urlPath);
          }
          else {
            exports.sendRedirect(res,"/loading.html");
          }
        })
      }
      else {
        archive.addUrlToList(urlPath,function() {
          exports.sendRedirect(res,"/loading.html");
        })
      }
    });
  });
}

exports.OPTIONS = function(req,res) {
  exports.sendStatusCode(res, 200);

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

exports.sendResponse = function (res, obj, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(obj);
}

// As you progress, keep thinking about what helper functions you can put here!
