(function(){
  load(["index.js","loader.js","node_modules/glob/examples/g.js","node_modules/glob/examples/usr-local.js","node_modules/glob/glob.js","node_modules/glob/node_modules/inherits/inherits.js","node_modules/glob/node_modules/inherits/inherits_browser.js","node_modules/glob/node_modules/inherits/test.js","node_modules/glob/node_modules/minimatch/minimatch.js","node_modules/glob/node_modules/minimatch/node_modules/lru-cache/lib/lru-cache.js","node_modules/glob/node_modules/minimatch/node_modules/lru-cache/s.js","node_modules/glob/node_modules/minimatch/node_modules/lru-cache/test/basic.js","node_modules/glob/node_modules/minimatch/node_modules/lru-cache/test/foreach.js","node_modules/glob/node_modules/minimatch/node_modules/lru-cache/test/memory-leak.js","node_modules/glob/node_modules/minimatch/node_modules/sigmund/bench.js","node_modules/glob/node_modules/minimatch/node_modules/sigmund/sigmund.js","node_modules/glob/node_modules/minimatch/node_modules/sigmund/test/basic.js","node_modules/glob/node_modules/minimatch/test/basic.js","node_modules/glob/node_modules/minimatch/test/brace-expand.js","node_modules/glob/node_modules/minimatch/test/caching.js","node_modules/glob/node_modules/minimatch/test/defaults.js","node_modules/glob/test/00-setup.js","node_modules/glob/test/bash-comparison.js","node_modules/glob/test/cwd-test.js","node_modules/glob/test/globstar-match.js","node_modules/glob/test/mark.js","node_modules/glob/test/nocase-nomagic.js","node_modules/glob/test/pause-resume.js","node_modules/glob/test/root-nomount.js","node_modules/glob/test/root.js","node_modules/glob/test/stat.js","node_modules/glob/test/zz-cleanup.js","node_modules/watch/main.js","node_modules/watch/test/test_monitor.js","node_modules/watch/test/test_watchTree.js"]);

  function load(urls){
    urls.map(scriptEl).forEach(appendToHead);
  }

  function scriptEl(url){
    var el = document.createElement('script');
    el.src = url;

    return el;
  }

  function appendToHead(el){
    document.head.appendChild(el);
  }
}());