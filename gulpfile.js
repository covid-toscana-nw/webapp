var gulp = require('gulp'), 
    ts = require('gulp-typescript'), 
    exec = require('child_process').exec, 
    nodemon = require('gulp-nodemon'); 

gulp.task('backend', function () { 
    return gulp.src('./server/**/*')
    .pipe(gulp.dest('dist/')); 
});

gulp.task('frontend', function (cb) { 
    exec('npx ng build --prod --outputPath=dist/public', function (err, stdout, stderr) { 
        console.log(stdout); 
        console.log(stderr); 
        cb(err); 
    }); 
})


//gulp.task('watch', ['backend'], function () {
  //  gulp.watch('./server/**/*.ts', ['backend']);
//});

gulp.task('nodemon', function () { 
    nodemon({ 
        script: 'dist/server.js', 
        ext: 'js', 
        env: { 'NODE_ENV': 'development' } 
    }) 
});

//gulp.task('default', ['frontend', 'backend', 'watch', 'nodemon']);