(function(){
  load(__URLS__);

  function load(urls){
    urls.map(scriptEl).forEach(appendToHead);
  }

  function scriptEl(url){
    var el = document.createElement('script');
    el.async = false;
    el.src = url;

    return el;
  }

  function appendToHead(el){
    document.head.appendChild(el);
  }
}());