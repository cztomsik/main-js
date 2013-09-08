var
  assert = require('chai').assert,
  Generator = require('..'),
  glob = require('glob')
;

describe('Generator files', function(){
  var g = new Generator({
    directory: 'test/test-app',
    errorHandler: assert.fail
  });

  it('should be sorted alphabetically', function(){
    assert.deepEqual(g.sortFiles(['b', 'a']), ['a', 'b']);
  });

  it('children should precede parents', function(){
    assert.deepEqual(g.sortFiles(['a', 'b/c']), ['b/c', 'a']);
  });

  it('each directory should be sorted on its own', function(){
    assert.deepEqual(
      g.sortFiles(['a', 'b/c', 'd/e', 'd/f/g', 'd/f/h/i']),
      ['b/c', 'd/f/h/i', 'd/f/g', 'd/e', 'a']
    );
  });

  it('should respect documented order', function(done){
    g.findFiles()
      .then(function(files){
        assert.deepEqual(files, dirFiles([
          '!deps/jquery.js',
          '!deps/jquery.plugin.js',
          'common/BaseModel.js',
          'eshop/products/Product.js',
          'eshop/Cart.js',
          'users/User.js',
          'app.js'
        ]));
        done();
      })
      .catch(done)
    ;
  });

  function dirFiles(files){
    return files.map(function(f){
      return g.directory + '/' + f;
    });
  }
});