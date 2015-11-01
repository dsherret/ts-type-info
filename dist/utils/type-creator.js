var utils_1 = require("./../utils");
var types_1 = require("./../types");
var TypeCreator = (function () {
    function TypeCreator(typeChecker) {
        this.typeChecker = typeChecker;
        this.fileCaches = new utils_1.KeyValueCache();
        this.typeCache = new utils_1.KeyValueCache();
    }
    TypeCreator.prototype.get = function (tsType) {
        var cache = this.getCache(tsType);
        var name = this.typeChecker.typeToString(tsType);
        var type = cache.get(name);
        if (type == null) {
            type = new types_1.Type(this.typeChecker, tsType);
            cache.add(type.name, type);
            type.fillTypeInformation(this.typeChecker);
        }
        return type;
    };
    TypeCreator.prototype.getCache = function (tsType) {
        var fileName = this.getFileName(tsType);
        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    };
    TypeCreator.prototype.getFileCache = function (fileName) {
        var fileCache = this.fileCaches.get(fileName);
        if (fileCache == null) {
            fileCache = new utils_1.KeyValueCache();
            this.fileCaches.add(fileName, fileCache);
        }
        return fileCache;
    };
    TypeCreator.prototype.getFileName = function (tsType) {
        var fileName = null;
        var symbol = tsType.getSymbol();
        if (symbol != null && symbol.valueDeclaration != null) {
            var sourceFile = symbol.valueDeclaration.getSourceFile();
            if (sourceFile != null) {
                fileName = sourceFile.fileName;
            }
        }
        return fileName;
    };
    return TypeCreator;
})();
exports.TypeCreator = TypeCreator;
