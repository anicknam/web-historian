var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var fs = require('fs');
var url = require('url');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  
  var pathToRequestedFile = path.join(__dirname, './public');
  var statusCode;

  if (req.method === 'GET' && req.url === '/') {
     // we will give them index.html
    pathToRequestedFile += '/index.html';

    fs.readFile(pathToRequestedFile, function(error, content) {
      if (error) {
        throw error;
      } else {
        statusCode = 200;
        res.writeHead(statusCode, headers);
        res.end(content.toString());
      }
    });
    return;
  }
    
  
  var parsedURL = url.parse(req.url);
  var pathToArchivedSite = path.join(__dirname, '../test/testdata/sites');
  if (req.method === 'GET') {
    pathToArchivedSite += parsedURL.path;
     
    //console.log(pathToArchivedSite);
    fs.readFile(pathToArchivedSite, function(error, content) {
      if (error) {
        statusCode = 404;
        res.writeHead(statusCode, headers);
        res.end('Requested site not found');
      } else {
        statusCode = 200;
        res.writeHead(statusCode, headers);
        res.end(content.toString());
      }
    });
    return;
  }

  
  var pathToSitesList = path.join(__dirname, '../test/testdata/sites.txt');
  if (req.method === 'POST') {
    
    req.on('data', function(data) {

      var urlToStore = data.toString().slice(4);
      fs.appendFile(pathToSitesList, urlToStore + '\n', function(error) {
        if (error) {
          statusCode = 404;
          res.writeHead(statusCode, headers);
          res.end('Requested archive not found');
        } else {
          statusCode = 302; 
          res.writeHead(statusCode, headers);
          res.end('Success');
        }
      });
    });   
    return;
  }






















  if (req.method === 'POST') {
    res.end();
 
  }


};
