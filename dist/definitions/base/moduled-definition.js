var ts = require("typescript");
var ModuledDefinition = (function () {
    /* istanbul ignore next */ function ModuledDefinition() {
    }
    ModuledDefinition.prototype.fillMembersBySourceFile = function (typeChecker, definitionCache, file) {
        var _this = this;
        this.initializeMD();
        // namespaces
        typeChecker.getSymbolsInScope(file, 1536 /* Namespace */).forEach(function (namespaceSymbol) {
            if (typeChecker.isSymbolInFile(namespaceSymbol, file)) {
                _this.namespaces.push(definitionCache.getNamespaceDefinition(namespaceSymbol));
            }
        });
        // classes
        typeChecker.getSymbolsInScope(file, 32 /* Class */).forEach(function (classSymbol) {
            if (typeChecker.isSymbolInFile(classSymbol, file)) {
                _this.classes.push(definitionCache.getClassDefinition(classSymbol));
            }
        });
        // enums
        typeChecker.getSymbolsInScope(file, 384 /* Enum */).forEach(function (enumSymbol) {
            if (typeChecker.isSymbolInFile(enumSymbol, file)) {
                _this.enums.push(definitionCache.getEnumDefinition(enumSymbol));
            }
        });
        // functions
        typeChecker.getSymbolsInScope(file, 16 /* Function */).forEach(function (functionSymbol) {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                _this.functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });
        // interfaces
        typeChecker.getSymbolsInScope(file, 64 /* Interface */).forEach(function (interfaceSymbol) {
            if (typeChecker.isSymbolInFile(interfaceSymbol, file)) {
                _this.interfaces.push(definitionCache.getInterfaceDefinition(interfaceSymbol));
            }
        });
        // variables
        typeChecker.getSymbolsInScope(file, 2 /* BlockScopedVariable */ | 3 /* Variable */).forEach(function (variableSymbol) {
            if (typeChecker.isSymbolInFile(variableSymbol, file)) {
                _this.variables.push(definitionCache.getVariableDefinition(variableSymbol));
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
                _this.classes.push(definitionCache.getClassDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolInterface(localSymbol)) {
                _this.interfaces.push(definitionCache.getInterfaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolFunction(localSymbol)) {
                _this.functions.push(definitionCache.getFunctionDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolNamespace(localSymbol)) {
                _this.namespaces.push(definitionCache.getNamespaceDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolEnum(localSymbol)) {
                _this.enums.push(definitionCache.getEnumDefinition(localSymbol));
            }
            else if (typeChecker.isSymbolVariable(localSymbol)) {
                _this.variables.push(definitionCache.getVariableDefinition(localSymbol));
            }
            else {
                // console.log(symbol);
                console.warn("Unhandled symbol when filling moduled definition items: " + localSymbol.name);
            }
        });
    };
    ModuledDefinition.prototype.initializeMD = function () {
        this.namespaces = [];
        this.classes = [];
        this.interfaces = [];
        this.enums = [];
        this.functions = [];
        this.variables = [];
    };
    return ModuledDefinition;
})();
exports.ModuledDefinition = ModuledDefinition;

//# sourceMappingURL=moduled-definition.js.map
