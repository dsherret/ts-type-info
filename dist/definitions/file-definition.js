var ts = require("typescript");
var FileDefinition = (function () {
    function FileDefinition(typeChecker, definitionCache, file) {
        this._classes = [];
        this._functions = [];
        this._name = file.fileName;
        this.fillClasses(typeChecker, definitionCache, file);
    }
    FileDefinition.prototype.fillClasses = function (typeChecker, definitionCache, file) {
        var _this = this;
        typeChecker.getSymbolsInScope(file, 32).forEach(function (classSymbol) {
            _this._classes.push(definitionCache.getClassDefinition(classSymbol));
        });
        typeChecker.getSymbolsInScope(file, 16).forEach(function (functionSymbol) {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                _this._functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });
    };
    Object.defineProperty(FileDefinition.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDefinition.prototype, "classes", {
        get: function () {
            return this._classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDefinition.prototype, "functions", {
        get: function () {
            return this._functions;
        },
        enumerable: true,
        configurable: true
    });
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;

//# sourceMappingURL=file-definition.js.map
