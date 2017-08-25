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

gulp.task("css", ()=>{
    return gulp.src("./css/sass/**/*.sass")  // .scss/.sass ファイルを取得
        .pipe(sass({
            outputStyle: "expanded" // コンパイルする際の CSS の書式を指定できる
        }))
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest("./css/"));  // cssフォルダー以下に保存
});

gulp.task("css-min", ()=>{
    return gulp.src("./css/sass/**/*.sass")  // .scss/.sass ファイルを取得
        .pipe(sass({
            outputStyle: "compressed", // コンパイルする際の CSS の書式を指定できる
        }))
        // .pipe(concatCss("bundle.css"))
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest("./css/"));  // cssフォルダー以下に保存
});

gulp.task("browserify", ()=>{
    return browserify({
        entries: [`./js/src/${rootJsFileName}`],
        // debug: true,
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

gulp.task("browserify-env-production",
    [
        "apply-prod-environment",
        "browserify-min",
    ],()=>{
        return;
    }
);

gulp.task("clean", (callback)=>{
    return del([
        "./dist/**/*",
    ], callback);
});

gulp.task("dist", // deployment
    [
        "clean",
        "apply-prod-environment",
        "browserify-min",
        "css-min",
    ], ()=>{
        gulp.src("./index.html")
            .pipe(gulp.dest("./dist/"));
        gulp.src("./js/bundle.js")
            .pipe(gulp.dest("./dist/js/"));
        gulp.src("./css/bundle.css")
            .pipe(gulp.dest("./dist/css/"));
    }
);

gulp.task("watch", ["default"], ()=>{
    gulp.watch("./js/src/**/*.js", [
        // "apply-prod-environment",
        "browserify",
    ]);
    gulp.watch("./css/**/*.sass", [
        "css",
    ]);
});

gulp.task("default", [
    "browserify",
    "css",
]);
