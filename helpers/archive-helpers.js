var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // Reads url, turns it into an array;
  var result;
  fs.readFile(exports.paths.list, function (err,data) {
    result = data.toString();
    result = result.split('\n');
    console.log('result: ' + JSON.stringify(result));
    callback(result);
  });
};

exports.isUrlInList = function(url, callback){
  var cb = function (result) {
    var found;
    if (_.contains(result, url)) {
      found = true;
    } else {
      found = false;
    }
    callback(found);
  };
  exports.readListOfUrls(cb);
};

exports.addUrlToList = function(url, callback){
  var cb = function(bool) {
    if (!bool) {
      fs.appendFile(exports.paths.list, url, callback);
    } else {
      console.log(url + " in list.");
    }
  }
  exports.isUrlInList(url, cb);
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(err,files) {
    var found;
    if (files.indexOf(url)>-1) {
      found = true;
    }
    else {
      found = false;
    }
    callback(found)
  })
};

exports.downloadUrls = function(urlArray){
  //take input filepath / filename
  //write file to exports.paths.archivedSites
  _.each(urlArray, function(item) {
    fs.writeFile(exports.paths.archivedSites + '/' + item, item);
  });

};











