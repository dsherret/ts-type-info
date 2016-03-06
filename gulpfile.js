/// <binding />
var gulp = require("gulp");
var del = require("del");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var replace = require("gulp-replace");
var sourcemaps = require("gulp-sourcemaps");
var CodeBlockWriter = require("code-block-writer").default;
var p = require("./package.json");
var fs = require("fs");
var path = require("path");

gulp.task("typescript", ["clean-scripts"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    return gulp.src(["./src/typings/**/*.d.ts", "./src/**/*.ts", "!./src/tests/**/test-files/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(replace(/(}\)\()(.*\|\|.*;)/g, '$1/* istanbul ignore next */$2'))
        .pipe(replace(/(var __extends = \(this && this.__extends\))/g, '$1/* istanbul ignore next */'))
        .pipe(replace(/(if \(!exports.hasOwnProperty\(p\)\))/g, '/* istanbul ignore else */ $1'))
        // ignore empty constructors (for mixins and static classes)
        .pipe(replace(/(function [A-Za-z]+\(\) {[\s\n\t]+})/g, '/* istanbul ignore next */ $1'))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("pre-test", ["typescript"], function () {
    return gulp.src(["dist/**/*.js", "!dist/tests/**/*.js", "!dist/utils/file-utils.js"])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], function() {
    return gulp.src(["dist/tests/**/*.js"])
        .pipe(mocha({ reporter: "progress" }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: {
                    statements: 90,
                    branches: 90,
                    functions: 85, // because of structure wrappers which aren't implemented
                    lines: 90
                }
            }
        }));
});

gulp.task("tslint", function() {
    return gulp.src(["./src/**/*.ts", "!./src/typings/**/*.d.ts"])
        .pipe(tslint({
            rulesDirectory: "tslint-rules"
        }))
        .pipe(tslint.report("verbose"));
});

gulp.task("generate-definition-file", ["typescript"], function(cb) {
    var generateDefinitionFile = require("./dist/build/generate-definition-file").generateDefinitionFile;
    generateDefinitionFile();
});

function pad(width, string, padding) {
    return (width <= string.length) ? string : pad(width, string + padding, padding)
}

gulp.task("generate-readme", function(cb) {
    // use this library to generate the readme.md file
    var readmeCode = fs.readFileSync(path.join(__dirname, "resources/readme-code.ts"), "utf8");
    var readmeText = fs.readFileSync(path.join(__dirname, "resources/readme.txt"), "utf8");
    var tsTypeInfo = require("./dist/main");
    var readmeInfo = tsTypeInfo.getStringInfo(readmeCode);

    readmeText = readmeText
        .replace("{{Code}}", readmeCode)
        .replace("{{CodeOutput}}", JSON.stringify(readmeInfo));

    fs.writeFile(path.join(__dirname, "readme.md"), readmeText, function(err) {
        if (err) throw err;
        cb();
    });
});

gulp.task("ensure-dir-structures-match", function() {
    var FileUtils = require("./dist/utils/file-utils").FileUtils;
    var definitionDir = __dirname + "/src/definitions";
    var definitionFileNames = FileUtils.getAllFileNamesFromFolder(definitionDir).map(function(f) {
        return f.replace(definitionDir, "");
    });
    var testHelperDir = __dirname + "/src/tests/test-helpers";
    var testHelperFileNames = FileUtils.getAllFileNamesFromFolder(testHelperDir).map(function(f) {
        return f.replace(testHelperDir, "").replace("run-", "").replace("-tests", "");
    });

    var onlyInDefinitionFileNames = definitionFileNames.filter(function(f) {
        return testHelperFileNames.indexOf(f) === -1;
    });
    var onlyInTestHelperFileNames = testHelperFileNames.filter(function(f) {
        return definitionFileNames.indexOf(f) === -1;
    });

    if (onlyInDefinitionFileNames.length > 0) {
        console.log("Add these to test helpers (with run- prefix and -tests suffix):");
        console.log(onlyInDefinitionFileNames);
    }
    if (onlyInTestHelperFileNames.length > 0) {
        console.log("Add these to definitions or fix test-helpers:");
        console.log(onlyInTestHelperFileNames);
    }
})

gulp.task("watch", function() {
    gulp.watch("./src/**/*.ts", ["tslint", "typescript"]);
});

gulp.task("clean-scripts", function(cb) {
    return del(["./dist/**/*{.js,.js.map}"], cb);
});

gulp.task("default", ["tslint", "typescript"]);
