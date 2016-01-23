var ts = require("typescript");
var AmbientableDefinition = (function () {
    /* istanbul ignore next */ function AmbientableDefinition() {
    }
    AmbientableDefinition.prototype.fillIsAmbient = function (typeChecker, symbol) {
        var declaration;
        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }
        this.isAmbient = declaration.flags & 2 /* Ambient */ ? true : false;
    };
    return AmbientableDefinition;
})();
exports.AmbientableDefinition = AmbientableDefinition;

//# sourceMappingURL=ambientable-definition.js.map
