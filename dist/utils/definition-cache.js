var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var DefinitionCache = (function () {
    function DefinitionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.classes = new utils_1.KeyValueCache();
        this.enums = new utils_1.KeyValueCache();
        this.files = new utils_1.KeyValueCache();
        this.functions = new utils_1.KeyValueCache();
        this.interfaces = new utils_1.KeyValueCache();
    }
    DefinitionCache.prototype.getFileDefinition = function (sourceFile) {
        var fileDefinition = this.files.get(sourceFile);
        if (fileDefinition == null) {
            fileDefinition = new definitions_1.FileDefinition(this.typeChecker, this, sourceFile);
            this.files.add(sourceFile, fileDefinition);
            fileDefinition.fillReExports(this.typeChecker, this, sourceFile);
        }
        return fileDefinition;
    };
    DefinitionCache.prototype.getClassDefinition = function (symbol) {
        var _this = this;
        var classDefinition;
        if (definitions_1.ClassDefinition.isClassDefinition(symbol)) {
            classDefinition = this.classes.get(symbol);
            if (classDefinition == null) {
                classDefinition = new definitions_1.ClassDefinition(this.typeChecker, symbol, this.typeChecker.getExtendsSymbols(symbol).map(function (base) { return _this.getClassDefinition(base); }), this.typeChecker.getImplementsSymbols(symbol).map(function (base) { return _this.getClassOrInterfaceDefinition(base); }));
                this.classes.add(symbol, classDefinition);
            }
        }
        return classDefinition;
    };
    DefinitionCache.prototype.getInterfaceDefinition = function (symbol) {
        var _this = this;
        var interfaceDefinition;
        if (definitions_1.InterfaceDefinition.isInterfaceDefinition(symbol)) {
            interfaceDefinition = this.interfaces.get(symbol);
            if (interfaceDefinition == null) {
                interfaceDefinition = new definitions_1.InterfaceDefinition(this.typeChecker, symbol, this.typeChecker.getExtendsSymbols(symbol).map(function (base) { return _this.getClassOrInterfaceDefinition(base); }));
                this.interfaces.add(symbol, interfaceDefinition);
            }
        }
        return interfaceDefinition;
    };
    DefinitionCache.prototype.getEnumDefinition = function (symbol) {
        var enumDefinition;
        if (definitions_1.EnumDefinition.isEnumDefinition(symbol)) {
            enumDefinition = this.enums.get(symbol);
            if (enumDefinition == null) {
                enumDefinition = new definitions_1.EnumDefinition(this.typeChecker, symbol);
                this.enums.add(symbol, enumDefinition);
            }
        }
        return enumDefinition;
    };
    DefinitionCache.prototype.getFunctionDefinition = function (symbol) {
        var functionDefinition;
        if (definitions_1.FunctionDefinition.isFunctionDefinition(symbol)) {
            functionDefinition = this.functions.get(symbol);
            if (functionDefinition == null) {
                functionDefinition = new definitions_1.FunctionDefinition(this.typeChecker, symbol);
                this.functions.add(symbol, functionDefinition);
            }
        }
        return functionDefinition;
    };
    DefinitionCache.prototype.getClassOrInterfaceDefinition = function (symbol) {
        return this.getClassDefinition(symbol) || this.getInterfaceDefinition(symbol);
    };
    DefinitionCache.prototype.getDefinition = function (symbol) {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getInterfaceDefinition(symbol) ||
            this.getEnumDefinition(symbol);
    };
    return DefinitionCache;
})();
exports.DefinitionCache = DefinitionCache;

//# sourceMappingURL=definition-cache.js.map
