var ts = require("typescript");
var AmbientableDefinition = (function () {
    /* istanbul ignore next */ function AmbientableDefinition() {
    }
    AmbientableDefinition.prototype.fillAmbientable = function (typeChecker, symbol) {
        var declaration;
        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }
        this.hasDeclareKeyword = declaration.flags & 2 /* Ambient */ ? true : false;
        if (this.hasDeclareKeyword || typeChecker.isSymbolInterface(symbol)) {
            this.isAmbient = true;
        }
        else {
            this.isAmbient = this.isAnyParentAmbient(declaration);
        }
    };
    AmbientableDefinition.prototype.isAnyParentAmbient = function (declaration) {
        while (declaration.parent != null) {
            if (declaration.parent.flags & 2 /* Ambient */) {
                return true;
            }
            declaration = declaration.parent;
        }
        return false;
    };
    return AmbientableDefinition;
})();
exports.AmbientableDefinition = AmbientableDefinition;

//# sourceMappingURL=ambientable-definition.js.map
