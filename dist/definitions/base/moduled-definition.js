var ts = require("typescript");
var utils_1 = require("./../../utils");
var ModuledDefinition = (function () {
    /* istanbul ignore next */ function ModuledDefinition() {
    }
    ModuledDefinition.prototype.fillMembersBySourceFile = function (typeChecker, definitionCache, file) {
        var _this = this;
        this.initializeMD();
        // namespaces
        typeChecker.getSymbolsInScope(file, 1536 /* Namespace */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddNamespace(definitionCache, symbol);
            }
        });
        // classes
        typeChecker.getSymbolsInScope(file, 32 /* Class */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddClass(definitionCache, symbol);
            }
        });
        // enums
        typeChecker.getSymbolsInScope(file, 384 /* Enum */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddEnum(definitionCache, symbol);
            }
        });
        // functions
        typeChecker.getSymbolsInScope(file, 16 /* Function */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddFunction(definitionCache, symbol);
            }
        });
        // interfaces
        typeChecker.getSymbolsInScope(file, 64 /* Interface */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddInterface(definitionCache, symbol);
            }
        });
        // variables (I don't think ts.SymbolFlags.FunctionScopedVariable is necessary here because a variable wouldn't be function on the file level)
        typeChecker.getSymbolsInScope(file, 2 /* BlockScopedVariable */ | 3 /* Variable */).forEach(function (symbol) {
            if (typeChecker.isSymbolInFile(symbol, file)) {
                _this.tryAddVariable(definitionCache, symbol);
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
                _this.tryAddClass(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolInterface(localSymbol)) {
                _this.tryAddInterface(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolFunction(localSymbol)) {
                _this.tryAddFunction(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolNamespace(localSymbol)) {
                _this.tryAddNamespace(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolEnum(localSymbol)) {
                _this.tryAddEnum(definitionCache, localSymbol);
            }
            else if (typeChecker.isSymbolVariable(localSymbol)) {
                _this.tryAddVariable(definitionCache, localSymbol);
            }
            else {
                console.warn("Unhandled symbol when filling moduled definition items: " + localSymbol.name);
            }
        });
    };
    ModuledDefinition.prototype.tryAddNamespace = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getNamespaceDefinition(symbol); }, function (def) {
            _this.namespaces.push(def);
        });
    };
    ModuledDefinition.prototype.tryAddClass = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getClassDefinition(symbol); }, function (def) {
            _this.classes.push(def);
        });
    };
    ModuledDefinition.prototype.tryAddEnum = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getEnumDefinition(symbol); }, function (def) {
            _this.enums.push(def);
        });
    };
    ModuledDefinition.prototype.tryAddFunction = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getFunctionDefinition(symbol); }, function (def) {
            _this.functions.push(def);
        });
    };
    ModuledDefinition.prototype.tryAddInterface = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getInterfaceDefinition(symbol); }, function (def) {
            _this.interfaces.push(def);
        });
    };
    ModuledDefinition.prototype.tryAddVariable = function (definitionCache, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return definitionCache.getVariableDefinition(symbol); }, function (def) {
            _this.variables.push(def);
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
