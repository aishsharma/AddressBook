var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    clean = require('gulp-clean');

gulp.task('buildAssets', function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('transferTemplates', function() {
    return gulp.src('src/templates/*')
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('transferPages', function() {
    return gulp.src('src/pages/*')
        .pipe(gulp.dest('dist/pages'));
});

gulp.task('transferFonts', function() {
    return gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function() {
    return gulp.src('dist/*', { read: false })
        .pipe(clean());
});

gulp.task('build', ['buildAssets', 'transferPages', 'transferTemplates', 'transferFonts']);
