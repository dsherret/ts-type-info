var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var DefinitionCache = (function () {
    function DefinitionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.classes = new utils_1.KeyValueCache();
        this.functions = new utils_1.KeyValueCache();
    }
    DefinitionCache.prototype.getClassDefinition = function (symbol) {
        var _this = this;
        var classDefinition = this.classes.get(symbol);
        if (classDefinition == null) {
            classDefinition = new definitions_1.ClassDefinition(this.typeChecker, symbol, this.typeChecker.getBaseTypeSymbols(symbol).map(function (base) { return _this.getClassDefinition(base); }));
            this.classes.add(symbol, classDefinition);
        }
        return classDefinition;
    };
    DefinitionCache.prototype.getFunctionDefinition = function (symbol) {
        var functionDefinition = this.functions.get(symbol);
        if (functionDefinition == null) {
            functionDefinition = new definitions_1.FunctionDefinition(this.typeChecker, symbol);
            this.functions.add(symbol, functionDefinition);
        }
        return functionDefinition;
    };
    return DefinitionCache;
})();
exports.DefinitionCache = DefinitionCache;

//# sourceMappingURL=definition-cache.js.map
