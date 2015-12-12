var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ts = require("typescript");
var utils_1 = require("./../utils");
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
    __decorate([
        utils_1.Serializable
    ], FileDefinition.prototype, "name", null);
    __decorate([
        utils_1.Serializable
    ], FileDefinition.prototype, "classes", null);
    __decorate([
        utils_1.Serializable
    ], FileDefinition.prototype, "functions", null);
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;

//# sourceMappingURL=file-definition.js.map
