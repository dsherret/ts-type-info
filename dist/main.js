function __export(m) {
    for (var p in m) /* istanbul ignore else */ if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var ts = require("typescript");
var path = require("path");
var tmp = require("tmp");
var fs = require("fs");
var utils_1 = require("./utils");
__export(require("./compiler-options"));
__export(require("./definitions"));
__export(require("./expressions"));
__export(require("./scope"));
function getFileInfo(fileNames, compilerOptions) {
    if (compilerOptions === void 0) { compilerOptions = {}; }
    verifyArray(fileNames);
    var options = getCompilerOptions(compilerOptions);
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(fileNames, options, host);
    var tsTypeChecker = program.getTypeChecker();
    var typeChecker = new utils_1.TypeChecker(tsTypeChecker);
    var typeExpressionCache = new utils_1.TypeExpressionCache(typeChecker);
    var definitionCache = new utils_1.DefinitionCache(typeChecker);
    typeChecker.setTypeCache(typeExpressionCache);
    var sourceFiles = program.getSourceFiles()
        .filter(function (file) {
        var baseName = path.basename(file.fileName);
        return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
    })
        .map(function (file) {
        typeChecker.setCurrentNode(file);
        return definitionCache.getFileDefinition(file);
    });
    typeExpressionCache.fillAllCachedTypesWithDefinitions(definitionCache);
    return sourceFiles;
}
exports.getFileInfo = getFileInfo;
function getStringInfo(code, compilerOptions) {
    if (compilerOptions === void 0) { compilerOptions = {}; }
    verifyString(code);
    var tmpFile = tmp.fileSync({ postfix: ".ts" });
    var fileDefinition;
    try {
        code = utils_1.StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name], compilerOptions)[0];
    }
    finally {
        tmpFile.removeCallback();
    }
    return fileDefinition;
}
exports.getStringInfo = getStringInfo;
function verifyArray(fileNames) {
    if (!(fileNames instanceof Array)) {
        throw new Error("Please provide an array of file names to getFileInfo.");
    }
}
function verifyString(code) {
    if (typeof code !== "string") {
        throw new Error("Please provide a string to getStringInfo");
    }
}
function getCompilerOptions(compilerOptions) {
    function getValue(currentValue, newValue) {
        return (currentValue == null) ? newValue : currentValue;
    }
    var combinedOptions = compilerOptions;
    combinedOptions.allowNonTsExtensions = getValue(combinedOptions.allowNonTsExtensions, true);
    combinedOptions.noLib = getValue(combinedOptions.noLib, false);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.experimentalAsyncFunctions = getValue(combinedOptions.experimentalAsyncFunctions, true);
    combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
    combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
    combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);
    return combinedOptions;
}

//# sourceMappingURL=main.js.map
