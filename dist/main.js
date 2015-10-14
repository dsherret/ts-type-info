var ts = require("typescript");
var definitions_1 = require("./definitions");
var path = require("path");
var utils_1 = require("./utils");
function getFileInfo() {
    var fileNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fileNames[_i - 0] = arguments[_i];
    }
    var options = { noLib: false, experimentalDecorators: true };
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(fileNames, options, host);
    var tsTypeChecker = program.getTypeChecker();
    return program.getSourceFiles()
        .filter(function (file) { return path.basename(file.fileName) !== "lib.d.ts"; })
        .map(function (file) {
        var typeChecker = new utils_1.TypeChecker(tsTypeChecker, file);
        var definitionCache = new utils_1.DefinitionCache(typeChecker);
        return new definitions_1.FileDefinition(typeChecker, definitionCache, file);
    });
}
exports.getFileInfo = getFileInfo;

//# sourceMappingURL=main.js.map
