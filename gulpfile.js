var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('copy', function() {
  gulp
    .src('dist/index.html')
    .pipe(rename('allarticles.html'))
    .pipe(gulp.dest('templates'));

  gulp
    .src('dist/index.html')
    .pipe(rename('category.html'))
    .pipe(gulp.dest('templates'));

  gulp.src('dist/index.html').pipe(gulp.dest('templates'));

  gulp
    .src('dist/index.html')
    .pipe(rename('article.html'))
    .pipe(gulp.dest('templates'));

  gulp
    .src('dist/index.html')
    .pipe(rename('categorylist.html'))
    .pipe(gulp.dest('templates'));

  gulp
    .src('dist/*.js')
    .pipe(gulp.dest('static'))
    .pipe(gulp.dest('dist/static'));
});
