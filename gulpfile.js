var gulp = require("gulp");
var del = require("del");
var dtsGenerator = require("dts-generator");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var p = require("./package.json");

gulp.task("typescript", ["clean-scripts"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    return gulp.src(["./typings/**/*.d.ts", "./src/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(babel())
        .pipe(concat(p.name + ".js"))
        .pipe(sourcemaps.write("./")).pipe(gulp.dest("./dist"));
});

gulp.task("dts-generator", ["clean-scripts"], function(cb) {
    dtsGenerator.generate({
        name: p.name,
        main: p.name + "/main",
        baseDir: './src',
        files: ['main.ts', '../node_modules/typescript/lib/typescript.d.ts'],
        excludes: ["node_modules/**/*.d.ts", "utils/type-guards.ts"],
        out: "./dist/" + p.name + ".d.ts"
    });
    cb();
});

gulp.task("tslint", function() {
    return gulp.src(["./src/**/*.ts", "!./src/typings/**/*.d.ts"])
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task("watch", function() {
    gulp.watch("./src/**/*.ts", ["scripts"]);
});

gulp.task("clean-scripts", function(cb) {
    return del(["./dist/**/*"], cb);
});

gulp.task("default", ["tslint", "typescript", "dts-generator", "watch"]);