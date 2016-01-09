var ts = require("typescript");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var TypeParameterDefinition = (function () {
    function TypeParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillConstraint(typeChecker, symbol);
    }
    TypeParameterDefinition.prototype.fillConstraint = function (typeChecker, symbol) {
        var declaration = this.getTypeDeclaration(typeChecker, symbol);
        if (declaration.constraint != null) {
            this.constraint = typeChecker.getTypeExpressionAtLocation(declaration.constraint);
        }
    };
    TypeParameterDefinition.prototype.getTypeDeclaration = function (typeChecker, symbol) {
        return symbol.getDeclarations()[0];
    };
    TypeParameterDefinition.isTypeParameter = function (symbol) {
        return (symbol.getFlags() & 262144 /* TypeParameter */) !== 0;
    };
    return TypeParameterDefinition;
})();
exports.TypeParameterDefinition = TypeParameterDefinition;
utils_1.applyMixins(TypeParameterDefinition, [base_1.NamedDefinition]);

//# sourceMappingURL=type-parameter-definition.js.map
