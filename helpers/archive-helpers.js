var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var data = require('/Users/student/2016-02-web-historian/archives/sites.json');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.json')
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
exports.readListOfUrls = function() {
  // fs.exists(sites, function (exists) {
  //     console.log('-------------exists--------SITES------------>', sites);
  //   if (exists) {
  //     fs.readFile(JSON.stringify(sites), function(err, data) {
  //     console.log('---------------------SITES------------>', sites);
  //       if (err) {
  //         console.log('ERRRRROOOOORRRRR couldnt read the sites file');
  //       } else {
  //         console.log('------------------------data---->', data);
  //       }
  //     });
  //   }
  // });

  console.log('!!!!!!!!!!!!data!!!!!!!!!!!!', data['www.google.com']);
  // fs.writeFile("./data.json", JSON.stringify(data), function(err) {
  //   if(err) {
  //     return console.log(err);
  //   }

  //   console.log("The file was saved!");
  // }); 


};

// can accept a list that we read (above)
// and check if a URL is in that list
exports.isUrlInList = function() {
};

// can use fs.write to add a URL to a list
exports.addUrlToList = function() {
};


exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
