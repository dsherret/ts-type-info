var utils_1 = require("./../utils");
var expressions_1 = require("./../expressions");
var TypeExpressionCache = (function () {
    function TypeExpressionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.expressionCacheContainer = new CacheContainer(this.typeChecker);
        this.typeCacheContainer = new CacheContainer(this.typeChecker);
    }
    TypeExpressionCache.prototype.get = function (tsType) {
        var _this = this;
        var cache = this.expressionCacheContainer.getCache(tsType);
        var name = this.typeChecker.typeToString(tsType);
        var typeExpression = cache.get(name);
        if (typeExpression == null) {
            var types = tsType.types || [tsType];
            typeExpression = new expressions_1.TypeExpression(this.typeChecker, tsType);
            cache.add(typeExpression.text, typeExpression);
            types.forEach(function (t) {
                typeExpression.addType(_this.getType(t));
            });
        }
        return typeExpression;
    };
    TypeExpressionCache.prototype.fillAllCachedTypesWithDefinitions = function (definitionCache) {
        var _this = this;
        this.typeCacheContainer.getAllCacheItems().forEach(function (type) {
            var symbols = _this.typeChecker.getSymbolsFromType(type.tsType);
            /* istanbul ignore else */
            if (symbols.length === 1) {
                type.fillDefinition(definitionCache.getDefinition(symbols[0]));
            }
            else if (symbols.length > 1) {
                console.warn("Symbol length should not be greater than 1 for " + _this.typeChecker.typeToString(type.tsType));
            }
        });
    };
    TypeExpressionCache.prototype.getType = function (tsType) {
        var cache = this.typeCacheContainer.getCache(tsType);
        var name = this.typeChecker.typeToString(tsType);
        var type = cache.get(name);
        if (type == null) {
            type = new expressions_1.Type(this.typeChecker, tsType);
            cache.add(name, type);
            type.fillTypeInformation(this.typeChecker, this);
        }
        return type;
    };
    return TypeExpressionCache;
})();
exports.TypeExpressionCache = TypeExpressionCache;
var CacheContainer = (function () {
    function CacheContainer(typeChecker) {
        this.typeChecker = typeChecker;
        this.fileCache = new utils_1.KeyValueCache();
        this.typeCache = new utils_1.KeyValueCache();
    }
    CacheContainer.prototype.getCache = function (tsType) {
        var fileName = this.getFileName(tsType);
        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    };
    CacheContainer.prototype.getAllCacheItems = function () {
        var a = [];
        a.push.apply(a, this.typeCache.getAll());
        this.fileCache.getAll().forEach(function (c) {
            a.push.apply(a, c.getAll());
        });
        return a;
    };
    CacheContainer.prototype.getFileCache = function (fileName) {
        var fileCache = this.fileCache.get(fileName);
        if (fileCache == null) {
            fileCache = new utils_1.KeyValueCache();
            this.fileCache.add(fileName, fileCache);
        }
        return fileCache;
    };
    CacheContainer.prototype.getFileName = function (tsType) {
        var fileName = null;
        var symbol = tsType.getSymbol();
        if (symbol != null && symbol.valueDeclaration != null) {
            var sourceFile = symbol.valueDeclaration.getSourceFile();
            /* istanbul ignore else */
            if (sourceFile != null) {
                fileName = sourceFile.fileName;
            }
            else {
                console.warn("Could not get source file.");
            }
        }
        return fileName;
    };
    return CacheContainer;
})();

//# sourceMappingURL=type-expression-cache.js.map
