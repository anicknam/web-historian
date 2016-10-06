// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');

var pathToSitesList = path.join(__dirname, '../archives/sites.txt');

fs.readFile(pathToSitesList, function(error, content) {
  if (error) {
    throw error; // FIXME
  } else {
    var sitesArray = content.toString().split('\n');
    sitesArray.pop();
    archive.downloadUrls(sitesArray);
    fs.writeFile(pathToSitesList, '', function(error) {
      if (error) {
        throw error; // FIXME
      }
    });
  }

});

