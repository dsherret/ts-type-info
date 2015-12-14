var ts = require("typescript");
var re_export_definition_1 = require("./re-export-definition");
var FileDefinition = (function () {
    function FileDefinition(typeChecker, definitionCache, file) {
        this._classes = [];
        this._enums = [];
        this._functions = [];
        this._reExports = [];
        this._fileName = file.fileName;
        this.fillMembers(typeChecker, definitionCache, file);
    }
    FileDefinition.prototype.fillReExports = function (typeChecker, definitionCache, file) {
        for (var _i = 0, _a = typeChecker.getFileReExportSymbols(file); _i < _a.length; _i++) {
            var fileReExportSymbol = _a[_i];
            var exportDefinition = definitionCache.getDefinition(fileReExportSymbol);
            if (exportDefinition != null) {
                this._reExports.push(new re_export_definition_1.ReExportDefinition(definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileReExportSymbol)), exportDefinition));
            }
            else {
                console.warn("Not implemented re-export symbol: " + fileReExportSymbol.name);
            }
        }
    };
    FileDefinition.prototype.fillMembers = function (typeChecker, definitionCache, file) {
        var _this = this;
        typeChecker.getSymbolsInScope(file, 32).forEach(function (classSymbol) {
            _this._classes.push(definitionCache.getClassDefinition(classSymbol));
        });
        typeChecker.getSymbolsInScope(file, 384).forEach(function (enumSymbol) {
            if (typeChecker.isSymbolInFile(enumSymbol, file)) {
                _this._enums.push(definitionCache.getEnumDefinition(enumSymbol));
            }
        });
        typeChecker.getSymbolsInScope(file, 16).forEach(function (functionSymbol) {
            if (typeChecker.isSymbolInFile(functionSymbol, file)) {
                _this._functions.push(definitionCache.getFunctionDefinition(functionSymbol));
            }
        });
    };
    Object.defineProperty(FileDefinition.prototype, "fileName", {
        get: function () {
            return this._fileName;
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
    Object.defineProperty(FileDefinition.prototype, "enums", {
        get: function () {
            return this._enums;
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
    Object.defineProperty(FileDefinition.prototype, "reExports", {
        get: function () {
            return this._reExports;
        },
        enumerable: true,
        configurable: true
    });
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;

//# sourceMappingURL=file-definition.js.map
