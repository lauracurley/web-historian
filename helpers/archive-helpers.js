var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var data = require('/Users/student/2016-02-web-historian/archives/sites.txt');


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

// we have a file with a list of URLS
// the below function reads that list of URLS
var sitesFilePath = '/Users/student/2016-02-web-historian/archives/sites.txt';

exports.readListOfUrls = function(callback) { // lookup === 'www.google.com'
  var f = sitesFilePath;
  fs.exists(f, function (exists) {
    if (exists) {
      console.log('------------------just checking---------------');
      fs.readFile(f, 'utf8', function(err, data) {
        if (err) {
          console.log('-----------Error: can\'t read list of urls----------');
          return;
        }
        // this is where we want to make an array from the read file
        return data.split('\n'); 
      });
    } else {
      console.log('-----------Error: filepath doesnt exist----------');
    }
  });
};

// can accept a list that we read (above)
// and check if a URL is in that list
exports.isUrlInList = function(lookup, callback) { // lookup === URL were looking for 
  var sites = readListOfUrls();
  console.log('-----------------------sites--->', sites);
  // if lookup is in the array we get from splitting sites.txt by \n
  if (sites.indexOf(lookup) !== -1) {
    return true;
  } else {
    return false;
  }
};

// can use fs.write to add a URL to a list
exports.addUrlToList = function(lookup, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
    callback();
  });
};


exports.isUrlArchived = function(lookup, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
