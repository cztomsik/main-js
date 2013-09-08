'use strict';

var
  Q = require('Q'),
  _ = require('lodash'),
  watch = require('watch'),
  glob = require('glob'),
  fs = require('fs'),
  loaderTpl = fs.readFileSync(__dirname + '/loader.js', 'UTF-8')
;


function Generator(opts){
  _.extend(this, opts);
}

Generator.prototype = {
  //default options
  target: 'main.js',
  directory: '.',
  pattern: '**/*.js',
  minify: false,

  //safe to override
  loaderTpl: loaderTpl,
  minifyResult: function(res){ return res; },
  joinSources: function(sources){
    return sources.join(String.fromCharCode(10));
  },
  errorHandler: console.error,

  watch: function(){
    var generate = this.generate.bind(this);

    generate();
    return watch.createMonitor(this.directory, function (m) {
      m.on('created', generate);
      m.on('changed', generate);
      m.on('removed', generate);
    });
  },

  generate: function(){
    return this.findFiles()
      .then(this.processFiles.bind(this))
      .then(this.writeResult.bind(this))
      .catch(this.errorHandler)
    ;
  },

  findFiles: function(){
    var target = this.directory + '/' + this.target;

    return Q.nfcall(glob, this.directory + '/' + this.pattern)
      .then(preventCycling)
      .then(sortByDepth)
    ;

    function preventCycling(fls){
      return _.without(fls, target);
    }

    function sortByDepth(fls){
      return _.sortBy(fls, fileDepth);
    }

    function fileDepth(f){
      return f.split('/').length;
    }
  },

  processFiles: function(files){
    if (this.minify){
      return Q.all(files.map(this.readFile)).then(this.joinSources);
    }

    return this.loaderTpl.replace('__URLS__', JSON.stringify(files));
  },

  readFile: function(f, cb){
    return Q.nfcall(fs.readFile, f, 'utf-8', cb);
  },

  writeResult: function(result){
    return Q.nfcall(fs.writeFile, this.target, result);
  }
};


module.exports = Generator;