var fs = require('fs');
var request = require('request');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
var helpers = require('./http-helpers');
var url = require('url');


exports.handleRequest = function (request, response) {
  var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
  };
  if (request.method === 'GET') {
    var lookup, f;
    if (request.url === '/') { 
      lookup = '/index.html'; 
      lookup = __dirname + '/public' + lookup; f = lookup; 
      fs.readFile(f, 'utf8', function(err, data) {
        if (err) {
          response.writeHead(404); response.end('Server Error!');
          return;
        }
        var headers = {'Content-type': mimeTypes[path.extname(request.url)]};  
        response.writeHead(200, headers);
        response.end(data);
      });
    } else {
      lookup = url.parse(request.url).pathname;
      helpers.serveAssets(response, lookup, function() {

        archive.isUrlInList(lookup, function(found) {
          if (found) {
            console.log(__dirname);
            helpers.sendRedirect(response, __dirname + '/loading.html');
          } else {
            helpers.send404(response);
          }
        });
      });
    }
  } else if (request.method === 'POST') {
    helpers.collectData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { // found site
          // check if site is on disk
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              // redirect to site page (/www.google.com)
              helpers.sendRedirect(response, '/' + url);
            } else {
              // Redirect to loading.html
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(url, function() {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  } else {
    helpers.send404(res);
  }
};

// The below code shows our progess before the solution came out.
// We decided not to refactor the below and refactored based on the solution above.
//     var lookup, f;
//     if (request.url === '/') { 
//       lookup = '/index.html'; 
//       lookup = __dirname + '/public' + lookup; f = lookup; 
//       // var lookup = path.basename(decodeURI(request.url)) || 'index.html', f = lookup;
//       fs.exists(f, function (exists) {
//         if (exists) {
//           fs.readFile(f, 'utf8', function(err, data) {
//             if (err) {
//               res.writeHead(404); res.end('Server Error!');
//               return;
//             }

//             var headers = {'Content-type': mimeTypes[path.extname(request.url)]};  
//             res.writeHead(200, headers);
//             res.end(data);
//           });
//           return;
//         } 
//         //doesn't exist
//         res.writeHead(404);
//         res.end();
//       });
//     } else { 
//       archive.isUrlInList(request.url, function(found) {
//         if (found) {
//           archive.isUrlArchived(request.url, function(archived) {
//             if (!archived) {
//               archive.readListOfUrls(archive.downloadUrls);
//             } else if (archived) {
//               helpers.serveAssets(res, request.url);
//             }
//           });
//         }
//       });
//     } 
//   };
// }
  //console.log(archive.isUrlInList('timmy'));


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

    // else {
    //     // console.log('--------------newLookup------------->', lookup);
    //     res.writeHead(404);
    //     res.end();
    // {
    //   lookup = request.url;
    //   var archivedData = archive.isUrlArchived(lookup);
    //   if (archivedData) {
    //     res.writeHead(200);
    //     res.end(archivedData);
        // serve up a file in the sites directory with request.url as the path name
      // }
    // }


  //invoking a normal function before a asynchronous function ends?
