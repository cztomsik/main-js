'use strict';

var
  watch = require('watch'),
  glob = require('glob'),
  fs = require('fs')
;

module.exports = function(){
  watch.createMonitor('.', function (monitor) {
    generate();

    monitor.on('created', generate);
    monitor.on('changed', generate);
    monitor.on('removed', generate);

    function generate(){
      glob('**/*.js', function(err, jsFiles){
        //stop cycling
        jsFiles.splice(jsFiles.indexOf('main.js'), 1);

        fs.readFile(__dirname + '/loader.js', 'UTF-8', function(err, loader){
          fs.writeFile('main.js', loader.replace('__URLS__', JSON.stringify(jsFiles)));
        });
      });
    }
  });
};