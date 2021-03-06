**DEPRECATED**: Use browserify/webpack

-----

Watches (current) directory **/*.js files and re-generates main.js, responsible for loading whole client-side application

- it does so by injecting `<script src="">` tags during development
- files are loaded **synchronously**
- debugging is still possible, original files are left untouched
- can be also minified to one dist file during build process (using uglifyjs --no-mangle)


###Ignored files
Directories starting with dot are ignored, this makes it perfect place for your bower dependencies. Use .bowerrc to override bower components directory.

###Order of loading
Files as loaded alphabetically, with each directory treated as module, dependent on its children. This can be better understood with following example:

    /test-app/
      /!deps/
        jquery.js
        jquery.plugin.js
      /common/
        BaseModel.js
      /eshop/
        /products/
          Product.js
        Cart.js
      /users/
        User.js
      app.js


Where app.js will be loaded last, Product will be loaded before Cart but after ActiveRecord, because it is in folder above. Jquery will be loaded first in this example.

**Resulting order**:

1. !deps/jquery.js
2. !deps/jquery.plugin.js
3. common/BaseModel.js
4. eshop/products/Product.js
5. eshop/Cart.js
6. users/User.js
7. app.js'



###Options
It is possible to override both filename, directory and/or glob-pattern, however it is discouraged to do so except for timestamped dist files.

###Install
`npm install -g main-js`

###Usage

    Usage: main-js [options]
           Watches (current) directory **/*.js files and re-generates main.js

    Options:

      -h, --help                output usage information
      -V, --version             output the version number
      --target [file]           target file name (main.js)
      --directory [dir]         dir to scan for js files (.)
      --pattern [glob-pattern]  custom js-file pattern (**/*.js)
      --build                   minify sources to target file, do not watch

    Development - watch for file changes:
      cd my-web-app
      main-js

    Build - generate "big" dist file:
      cd my-web-app
      main-js --build

    NOTE: Do not commit generated files to SCM, use --build flag during build instead
