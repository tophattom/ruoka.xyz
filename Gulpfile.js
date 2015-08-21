var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    revDel = require('rev-del');
    
gulp.task('build', function() {
    gulp.src('index.html')
        .pipe(usemin({
            css: [autoprefixer(), minifyCss(), 'concat', rev()],
            js: [uglify(), 'concat', rev()]
        }))
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(revDel({dest: 'build/'}))
        .pipe(gulp.dest('build/'));
});
    