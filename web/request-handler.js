var fs = require('fs');
var req = require('request');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
var data = require('/Users/student/2016-02-web-historian/archives/sites.json');


// var index = require('../web/public/index.html');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);

  var serveStatic = function(req, res) {
    var mimeTypes = {
      '.js': 'text/javascript',
      '.html': 'text/html',
      '.css': 'text/css'
    };
    var lookup, f;
    if (req.url === '/') { 
      lookup = '/index.html'; 
      lookup = __dirname + '/public' + lookup; f = lookup; 
    } else {
      lookup = (req.url.slice(1));
      console.log('--------------lookup--------------->', lookup);
      lookup = data[lookup]; f = lookup; 
      console.log('--------------Lookup-result------------>', f);
      res.end(f);
    }

    fs.exists(f, function (exists) {
      if (exists) {
        fs.readFile(f, 'utf8', function(err, data) {
          if (err) {
            res.writeHead(404); res.end('Server Error!');
            return;
          }

          var headers = {'Content-type': mimeTypes[path.extname(req.url)]};  
          res.writeHead(200, headers);
          res.end(data);
        });
        return;
      }
      //doesn't exist
      res.writeHead(404);
      res.end();
    });
  };

  //invoking a normal function before a asynchronous function ends?
  serveStatic(req, res);
};

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

// if (request.method === 'GET' && request.url === '/') {
//   var statusCode = 200;
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'text/html';
//   response.writeHead(statusCode, headers);
//   response.end('<input></input>');
// }

// var fileWriter = function(writeFilePath, profile, callback) {
//   fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(err, file) {
//     if (err) { return callback(err, null); }
//     callback(null, profile);
//   });
// };

// var fileWriterAsync = Promise.promisify(fileWriter);







