var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var ClassDefinitionCache = (function () {
    function ClassDefinitionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.classes = new utils_1.KeyValueCache();
    }
    ClassDefinitionCache.prototype.getClassDefinition = function (symbol) {
        var _this = this;
        var classDefinition = this.classes.get(symbol);
        if (classDefinition == null) {
            classDefinition = new definitions_1.ClassDefinition(this.typeChecker, symbol, this.typeChecker.getBaseTypeSymbols(symbol).map(function (base) { return _this.getClassDefinition(base); }));
            this.classes.add(symbol, classDefinition);
        }
        return classDefinition;
    };
    return ClassDefinitionCache;
})();
exports.ClassDefinitionCache = ClassDefinitionCache;

//# sourceMappingURL=class-definition-cache.js.map
