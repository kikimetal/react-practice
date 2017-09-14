// set entry point js file name
// const rootJsFileName = "App.js"
const rootJsFileName = "index.js"

import gulp from "gulp"
import babel from "gulp-babel"
import sass from "gulp-sass"
import concat from "gulp-concat"
import browserify from "browserify"
import babelify from "babelify"
import source from "vinyl-source-stream"
import buffer from "vinyl-buffer"
import uglify from "gulp-uglify"
import del from "del"
import cleanCSS from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"

gulp.task("sass-compile-components", ()=>{
    return gulp.src("./css/src/components/*.sass")
        .pipe(sass({
            outputStyle: "expanded",
        }))
        .pipe(concat("components-bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css/src/"))
})

gulp.task("sass-compile-common", () => {
    return gulp.src([
        "./css/src/common/myreset.sass",
        "./css/src/common/common.sass",
        "./css/src/common/*.sass",
    ])
        .pipe(sass({
            outputStyle: "expanded",
        }))
        .pipe(concat("common-bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css/src/"))
})

gulp.task("css",
    [
        "sass-compile-common",
        "sass-compile-components",
    ],
    () => {
        return gulp.src([
            "./css/src/common-bundle.css",
            "./css/src/components-bundle.css",
        ])
        .pipe(concat("bundle.css"))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(gulp.dest("./css/"))
    }
)

gulp.task("css-min",
    [
        "sass-compile-common",
        "sass-compile-components",
    ],
    () => {
        return gulp.src([
            "./css/src/common-bundle.css",
            "./css/src/components-bundle.css",
        ])
        .pipe(concat("bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + '(originalSize): ' + details.stats.originalSize);
            console.log(details.name + '(minifiedSize): ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest("./css/"))
    }
)


// gulp-clean-css Template
// gulp.task('minify-css', () => {
//     return gulp.src('styles/*.css')
//         .pipe(cleanCSS({debug: true}, function(details) {
//             console.log(details.name + ': ' + details.stats.originalSize);
//             console.log(details.name + ': ' + details.stats.minifiedSize);
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task("browserify-app", ()=>{
    return browserify({
        entries: [`./js/src/${rootJsFileName}`],
        debug: true,
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source("bundle.js")) // 出力ファイル名を指定
        .pipe(gulp.dest("./js/"));
});

gulp.task("browserify-app-min", ()=>{
    return browserify({
        entries: [`./js/src/${rootJsFileName}`],
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .pipe(source("bundle.js")) // 出力ファイル名を指定
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./js/"));
});

gulp.task("browserify-discovery", ()=>{
    return browserify({
        entries: [`./js/src/Discovery.js`],
        debug: true,
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source("discovery-bundle.js")) // 出力ファイル名を指定
        .pipe(gulp.dest("./js/"));
});

gulp.task("browserify-discovery-min", ()=>{
    return browserify({
        entries: [`./js/src/Discovery.js`],
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .pipe(source("discovery-bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./js/"));
});




gulp.task("apply-prod-environment", ()=>{
    return process.env.NODE_ENV = "production";
});

gulp.task("clean", (callback)=>{
    return del([
        "./__dist/**/*",
    ], callback);
});

gulp.task("dist", // deployment
    [
        "clean",
        "apply-prod-environment",
        "css-min",
        "browserify-app-min",
        "browserify-discovery-min",
    ], ()=>{
        gulp.src("./index.html")
            .pipe(gulp.dest("./__dist/"));
        gulp.src("./js/*.js")
            .pipe(gulp.dest("./__dist/js/"));
        gulp.src("./css/*.css")
            .pipe(gulp.dest("./__dist/css/"));
    }
);

gulp.task("watch", ["default"], ()=>{
    gulp.watch("./css/**/*", [
        "css",
    ])
    gulp.watch("./js/src/**/*.js", [
        "browserify-app",
        "browserify-discovery",
    ])
})

gulp.task("default", [
    "browserify-app",
    "browserify-discovery",
    "css",
])
