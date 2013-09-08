Watches current directory and re-generates main.js files including all **/*.js files

- it does so by injecting `<script src="">` tags during development
- files are loaded **synchronously**
- debugging is still possible, original files are left untouched
- can be also minified to one dist file during build process (using uglifyjs --no-mangle)


###Ignored files
Directories starting with dot are ignored, this makes it perfect place for your bower dependencies. Use .bowerrc to override bower components directory.

###Options
It is possible to override both filename, directory and/or glob-pattern, however it is discouraged to do so except for timestamped dist files.

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