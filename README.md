Watches current directory and re-generates main.js files
including all **/*.js files

- it does so by injecting `<script src="">` tags
- files are loaded **synchronously**
- debugging is still possible, original files are left untouched

##DEVELOPMENT usage:

    cd my_web_app
    ./main-js

##BUILD usage:

    cd my_web_app
    ./main-js --build

##TODO
- generate minified main.min.js (special command-line option)

NOTE: directories starting with dot are ignored,
  this is where your bower-components should be
