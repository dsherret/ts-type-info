var ts = require("typescript");
var ExportableDefinition = (function () {
    /* istanbul ignore next */ function ExportableDefinition() {
    }
    ExportableDefinition.prototype.fillExportable = function (typeChecker, symbol) {
        var declaration;
        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }
        this.hasExportKeyword = declaration.flags & 1 /* Export */ ? true : false;
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    };
    return ExportableDefinition;
})();
exports.ExportableDefinition = ExportableDefinition;

//# sourceMappingURL=exportable-definition.js.map
