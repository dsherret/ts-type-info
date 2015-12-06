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
        this.typeChecker = typeChecker;
        this.definitionCache = definitionCache;
        this.file = file;
        this._classes = [];
        this._name = file.fileName;
        this.fillClasses();
    }
    FileDefinition.prototype.fillClasses = function () {
        var _this = this;
        this.typeChecker.getSymbolsInScope(this.file, 32).forEach(function (classSymbol) {
            _this._classes.push(_this.definitionCache.getClassDefinition(classSymbol));
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
    __decorate([
        utils_1.Serializable
    ], FileDefinition.prototype, "name", null);
    __decorate([
        utils_1.Serializable
    ], FileDefinition.prototype, "classes", null);
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;

//# sourceMappingURL=file-definition.js.map
