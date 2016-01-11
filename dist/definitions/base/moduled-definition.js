var ts = require("typescript");
var ModuledDefinition = (function () {
    function ModuledDefinition() {
    }
    ModuledDefinition.prototype.fillMembersBySourceFile = function (typeChecker, definitionCache, file) {
        var _this = this;
        this.initializeMD();
        // classes
        typeChecker.getSymbolsInScope(file, 32 /* Class */).forEach(function (classSymbol) {
            if (typeChecker.isSymbolInFile(classSymbol, file)) {
                _this._classes.push(definitionCache.getClassDefinition(classSymbol));
            }
        });
        // enums
        typeChecker.getSymbolsInScope(file, 384 /* Enum */).forEach(function (enumSymbol) {
            if (typeChecker.isSymbolInFile(enumSymbol, file)) {
                _this._enums.push(definitionCache.getEnumDefinition(enumSymbol));
            }
        });
        // functions
        typeChecker.getSymbolsInScope(file, 16 /* Function */).forEach(function (functionSymbol) {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                _this._functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });
        // interfaces
        typeChecker.getSymbolsInScope(file, 64 /* Interface */).forEach(function (interfaceSymbol) {
            if (typeChecker.isSymbolInFile(interfaceSymbol, file)) {
                _this._interfaces.push(definitionCache.getInterfaceDefinition(interfaceSymbol));
            }
        });
        // namespaces
        typeChecker.getSymbolsInScope(file, 1536 /* Namespace */).forEach(function (namespaceSymbol) {
            if (typeChecker.isSymbolInFile(namespaceSymbol, file)) {
                _this._namespaces.push(definitionCache.getNamespaceDefinition(namespaceSymbol));
            }
        });
    };
    ModuledDefinition.prototype.fillMembersBySymbol = function (typeChecker, definitionCache, symbol) {
        var _this = this;
        this.initializeMD();
        var declaration = typeChecker.getDeclarationFromSymbol(symbol);
        var localSymbols = typeChecker.getLocalSymbolsFromDeclaration(declaration);
        localSymbols.forEach(function (localSymbol) {
            if (typeChecker.isSymbolClass(localSymbol)) {
                _this._classes.push(definitionCache.getClassDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolInterface(localSymbol)) {
                _this._interfaces.push(definitionCache.getInterfaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolFunction(localSymbol)) {
                _this._functions.push(definitionCache.getFunctionDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolNamespace(localSymbol)) {
                _this._namespaces.push(definitionCache.getNamespaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolEnum(localSymbol)) {
                _this._enums.push(definitionCache.getEnumDefinition(localSymbol));
            }
            else {
                // console.log(symbol);
                console.warn("Unhandled symbol when filling moduled definition items: " + localSymbol.name);
            }
        });
    };
    Object.defineProperty(ModuledDefinition.prototype, "namespaces", {
        get: function () {
            return this._namespaces;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuledDefinition.prototype, "classes", {
        get: function () {
            return this._classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuledDefinition.prototype, "enums", {
        get: function () {
            return this._enums;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuledDefinition.prototype, "functions", {
        get: function () {
            return this._functions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuledDefinition.prototype, "interfaces", {
        get: function () {
            return this._interfaces;
        },
        enumerable: true,
        configurable: true
    });
    ModuledDefinition.prototype.initializeMD = function () {
        this._namespaces = [];
        this._classes = [];
        this._enums = [];
        this._functions = [];
        this._interfaces = [];
    };
    return ModuledDefinition;
})();
exports.ModuledDefinition = ModuledDefinition;

//# sourceMappingURL=moduled-definition.js.map
