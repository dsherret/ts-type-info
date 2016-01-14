var ExportableDefinition = (function () {
    function ExportableDefinition() {
    }
    ExportableDefinition.prototype.fillIsExported = function (typeChecker, symbol) {
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    };
    return ExportableDefinition;
})();
exports.ExportableDefinition = ExportableDefinition;

//# sourceMappingURL=exportable-definition.js.map
