Watches current directory and re-generates main.js files
including all **/*.js files

- it does so by injecting `<script src="">` tags
- files are loaded **asynchronously**
- debugging is still possible, original files are left untouched

USAGE:
    cd my_web_app
    ./main-js

NOTE: directories starting with dot are ignored,
  this is where your bower-components should be
