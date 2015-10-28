var definitions_1 = require("./../definitions");
var DefinitionCache = (function () {
    function DefinitionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.classes = new CacheContainer();
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
    return DefinitionCache;
})();
exports.DefinitionCache = DefinitionCache;
var CacheContainer = (function () {
    function CacheContainer() {
        this.cacheItems = [];
    }
    CacheContainer.prototype.get = function (symbol) {
        for (var _i = 0, _a = this.cacheItems; _i < _a.length; _i++) {
            var cacheItem = _a[_i];
            if (cacheItem.symbol === symbol) {
                return cacheItem.definition;
            }
        }
        return null;
    };
    CacheContainer.prototype.add = function (symbol, definition) {
        this.cacheItems.push({ symbol: symbol, definition: definition });
    };
    return CacheContainer;
})();
