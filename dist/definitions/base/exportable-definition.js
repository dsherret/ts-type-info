var ExportableDefinition = (function () {
    /* istanbul ignore next */ function ExportableDefinition() {
    }
    ExportableDefinition.prototype.fillIsExported = function (typeChecker, symbol) {
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    };
    return ExportableDefinition;
})();
exports.ExportableDefinition = ExportableDefinition;

//# sourceMappingURL=exportable-definition.js.map
