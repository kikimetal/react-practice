// set entry point js file name
const rootJsFileName = "main.js";

import gulp from "gulp";
import babel from "gulp-babel";
import sass from "gulp-sass";
import concat from "gulp-concat";
import concatCss from "gulp-concat-css";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import del from "del";
import cleanCSS from "gulp-clean-css";

gulp.task("css-components", ()=>{
    return gulp.src("./css/components/**/*.sass")  // .scss/.sass ファイルを取得
        .pipe(sass({
            outputStyle: "expanded" // コンパイルする際の CSS の書式を指定できる
        }))
        // .pipe(concatCss("components.css"))
        .pipe(concat("components.css"))
        .pipe(gulp.dest("./css/"));  // cssフォルダー以下に保存
});
gulp.task("css",
    [
        "css-components",
    ],
    ()=>{
        return gulp.src([
            "./css/myreset.css",
            "./css/common.css",
            "./css/components.css",
        ])
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest("./css/"));
    }
);
gulp.task("css-min",
    [
        "css-components",
    ],
    ()=>{
        return gulp.src([
            "./css/myreset.css",
            "./css/common.css",
            "./css/components.css",
        ])
        .pipe(concat("bundle.css"))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + '(originalSize): ' + details.stats.originalSize);
            console.log(details.name + '(minifiedSize): ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest("./css/"));
    }
);

// gulp-clean-css Template
// gulp.task('minify-css', () => {
//     return gulp.src('styles/*.css')
//         .pipe(cleanCSS({debug: true}, function(details) {
//             console.log(details.name + ': ' + details.stats.originalSize);
//             console.log(details.name + ': ' + details.stats.minifiedSize);
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task("browserify", ()=>{
    return browserify({
        entries: [`./js/src/${rootJsFileName}`],
        debug: true,
    })
        .transform(babelify, {
            presets: ["latest", "react"],
        })
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source("bundle.js")) // 出力ファイル名を指定
        .pipe(gulp.dest("./js/"));
});

gulp.task("browserify-min", ()=>{
    return browserify({
        entries: [`./js/src/${rootJsFileName}`],
    })
        .transform(babelify, {
            presets: ["latest", "react"],
        })
        .bundle()
        .pipe(source("bundle.js")) // 出力ファイル名を指定
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
        "browserify-min",
    ], ()=>{
        gulp.src("./index.html")
            .pipe(gulp.dest("./__dist/"));
        gulp.src("./js/bundle.js")
            .pipe(gulp.dest("./__dist/js/"));
        gulp.src("./css/bundle.css")
            .pipe(gulp.dest("./__dist/css/"));
    }
);

gulp.task("watch", ["default"], ()=>{
    gulp.watch("./css/**/*.sass", [
        "css",
    ]);
    gulp.watch("./js/src/**/*.js", [
        "browserify",
    ]);
});

gulp.task("default", [
    "browserify",
    "css",
]);
