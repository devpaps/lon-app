const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: './'
    });
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], () => {
  gulp.watch('./assets/src/sass/**/*', ['styles']).on('change', reload);
  gulp.watch('.assets/src/js/**/*', ['scripts']).on('change', reload);
  gulp.watch('./*.html')
    .on('change', reload);
});


gulp.task('styles', () => {
  gulp.src('assets/src/sass/**/*.sass')
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('./public/css'))
    // .pipe(browserSync.stream());
});

//  Regular JavaScripts
gulp.task('scripts', () => {
  gulp.src('assets/src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});


// Images
/*gulp.task('images', () =>
  gulp.src('src/img/*')
  .pipe(imagemin({
    progressive: true,
    use: [pngquant()],
  }))
  .pipe(gulp.dest('img'))
);*/