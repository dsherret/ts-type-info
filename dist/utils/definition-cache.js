var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var DefinitionCache = (function () {
    function DefinitionCache(typeChecker) {
        this.typeChecker = typeChecker;
        this.namespaces = new utils_1.KeyValueCache();
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
            fileDefinition.fillImports(this.typeChecker, this, sourceFile);
            fileDefinition.fillReExports(this.typeChecker, this, sourceFile);
        }
        return fileDefinition;
    };
    DefinitionCache.prototype.getNamespaceDefinition = function (symbol) {
        var namespaceDefinition;
        if (this.typeChecker.isSymbolNamespace(symbol)) {
            namespaceDefinition = this.namespaces.get(symbol);
            if (namespaceDefinition == null) {
                namespaceDefinition = new definitions_1.NamespaceDefinition(this.typeChecker, symbol);
                this.namespaces.add(symbol, namespaceDefinition);
                namespaceDefinition.fillMembersBySymbol(this.typeChecker, this, symbol);
            }
        }
        return namespaceDefinition;
    };
    DefinitionCache.prototype.getClassDefinition = function (symbol) {
        var classDefinition;
        if (this.typeChecker.isSymbolClass(symbol)) {
            classDefinition = this.classes.get(symbol);
            if (classDefinition == null) {
                classDefinition = new definitions_1.ClassDefinition(this.typeChecker, symbol, this.typeChecker.getExtendsTypeExpressions(symbol), this.typeChecker.getImplementsTypeExpressions(symbol));
                this.classes.add(symbol, classDefinition);
            }
        }
        return classDefinition;
    };
    DefinitionCache.prototype.getInterfaceDefinition = function (symbol) {
        var interfaceDefinition;
        if (this.typeChecker.isSymbolInterface(symbol)) {
            interfaceDefinition = this.interfaces.get(symbol);
            if (interfaceDefinition == null) {
                interfaceDefinition = new definitions_1.InterfaceDefinition(this.typeChecker, symbol, this.typeChecker.getExtendsTypeExpressions(symbol));
                this.interfaces.add(symbol, interfaceDefinition);
            }
        }
        return interfaceDefinition;
    };
    DefinitionCache.prototype.getEnumDefinition = function (symbol) {
        var enumDefinition;
        if (this.typeChecker.isSymbolEnum(symbol)) {
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
        if (this.typeChecker.isSymbolFunction(symbol)) {
            functionDefinition = this.functions.get(symbol);
            if (functionDefinition == null) {
                functionDefinition = new definitions_1.FunctionDefinition(this.typeChecker, symbol);
                this.functions.add(symbol, functionDefinition);
            }
        }
        return functionDefinition;
    };
    DefinitionCache.prototype.getDefinition = function (symbol) {
        return this.getImportDefinition(symbol);
    };
    DefinitionCache.prototype.getImportDefinition = function (symbol) {
        return this.getClassDefinition(symbol) ||
            this.getFunctionDefinition(symbol) ||
            this.getInterfaceDefinition(symbol) ||
            this.getEnumDefinition(symbol) ||
            this.getNamespaceDefinition(symbol);
    };
    return DefinitionCache;
})();
exports.DefinitionCache = DefinitionCache;

//# sourceMappingURL=definition-cache.js.map
