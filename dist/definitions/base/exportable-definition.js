var ExportableDefinition = (function () {
    function ExportableDefinition() {
    }
    ExportableDefinition.prototype.fillIsExported = function (typeChecker, symbol) {
        this._isExported = typeChecker.isSymbolExportOfFile(symbol, typeChecker.getSourceFileOfSymbol(symbol));
    };
    Object.defineProperty(ExportableDefinition.prototype, "isExported", {
        get: function () {
            return this._isExported;
        },
        enumerable: true,
        configurable: true
    });
    return ExportableDefinition;
})();
exports.ExportableDefinition = ExportableDefinition;

//# sourceMappingURL=exportable-definition.js.map
