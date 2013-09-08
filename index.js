'use strict';

var
  UglifyJS = require('uglify-js'),
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
  minifyResult: function(res){
    return UglifyJS.minify(res, {fromString: true}).code;
  },
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
    var
      target = this.directory + '/' + this.target
    ;

    return Q.nfcall(glob, this.directory + '/' + this.pattern)
      .then(preventCycling)
      .then(this.sortFiles)
    ;

    function preventCycling(fls){
      return _.without(fls, target);
    }
  },

  processFiles: function(files){
    if (this.minify){
      return Q.all(files.map(this.readFile))
        .then(this.joinSources)
        .then(this.minifyResult)
      ;
    }

    return this.loaderTpl.replace('__URLS__', JSON.stringify(files));
  },

  readFile: function(f, cb){
    return Q.nfcall(fs.readFile, f, 'utf-8', cb);
  },

  writeResult: function(result){
    return Q.nfcall(fs.writeFile, this.target, result);
  },

  sortFiles: function(files){
    var paths = files.map(function(f){
      return f.split('/');
    });

    paths.sort(function(a, b){
      var res = comparePath(a, b);
      return res;
    });

    return paths.map(function(parts){
      return parts.join('/');
    });

    //TODO: (perf) inplace
    function comparePath(a, b){
      if ( ! a.length){
        return 0;
      }

      if ((a.length != b.length) && ((a.length === 1) || (b.length === 1))){
        return b.length - a.length;
      }

      if (a[0] === b[0]){
        return comparePath(a.slice(1), b.slice(1));
      }

      return a[0] > b[0] ?1 :-1;
    }
  },
};

module.exports = Generator;