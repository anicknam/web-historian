var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  var pathToSitesList = exports.paths.list;
  fs.readFile(pathToSitesList, function(error, content) {
    if (error) {
      throw error;
    } else {
      var sitesArray = content.toString().split('\n');
      callback(sitesArray); 
    }  

  });

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(list) {
    if (list.indexOf(url) >= 0) {
      callback(true);
    } else {
      callback(false);
    }
  });

};

exports.addUrlToList = function(url, callback) {

  var pathToSitesList = exports.paths.list;
  fs.appendFile(pathToSitesList, url + '\n', function(error) {
    if (error) {
      throw error;
    } else {
      callback();
    }
  });

};

exports.isUrlArchived = function(fileName, callback) {
  var archiveFolder = exports.paths.archivedSites;
  fs.exists(archiveFolder + '/' + fileName, function(exists) {
    if (!exists) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(sitesArray) {
  //exports.readListOfUrls(function(sitesArray) {
  var targetDir = exports.paths.archivedSites;
  sitesArray.forEach(function(url) {
    var request = http.get('http://' + url, function(response) {
      var file = fs.createWriteStream(targetDir + '/' + url);
      response.pipe(file);
      file.on('finish', function() {
        file.close();  // close() is async, call cb after close completes.
      });
    });
  });

  //});

};
