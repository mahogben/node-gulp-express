'use strict'

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    nodemon({
        script: 'bin/www',
        ext: 'js handlebars',
        env: {
            NODE_ENV: 'dev',
            PORT: 9090
        },
        ignore: ['./node_modules/**']
    });
});