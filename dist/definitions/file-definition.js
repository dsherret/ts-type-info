var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
    Object.defineProperty(FileDefinition.prototype, "name",
        __decorate([
            utils_1.Serializable
        ], FileDefinition.prototype, "name", Object.getOwnPropertyDescriptor(FileDefinition.prototype, "name")));
    Object.defineProperty(FileDefinition.prototype, "classes",
        __decorate([
            utils_1.Serializable
        ], FileDefinition.prototype, "classes", Object.getOwnPropertyDescriptor(FileDefinition.prototype, "classes")));
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;

//# sourceMappingURL=file-definition.js.map
