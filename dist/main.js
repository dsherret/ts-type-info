function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var ts = require("typescript");
var path = require("path");
var tmp = require("tmp");
var fs = require("fs");
var utils_1 = require("./utils");
__export(require("./definitions"));
__export(require("./types"));
__export(require("./scope"));
function getFileInfo(fileNames) {
    verifyArray(fileNames);
    var options = { noLib: false, experimentalDecorators: true };
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(fileNames, options, host);
    var tsTypeChecker = program.getTypeChecker();
    return program.getSourceFiles()
        .filter(function (file) { return path.basename(file.fileName) !== "lib.d.ts"; })
        .map(function (file) {
        var typeChecker = new utils_1.TypeChecker(tsTypeChecker, file);
        var definitionCache = new utils_1.DefinitionCache(typeChecker);
        return definitionCache.getFileDefinition(file);
    });
}
exports.getFileInfo = getFileInfo;
function getStringInfo(code) {
    verifyString(code);
    var tmpFile = tmp.fileSync({ postfix: ".ts" });
    var fileDefinition;
    try {
        code = utils_1.StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name])[0];
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

//# sourceMappingURL=main.js.map
