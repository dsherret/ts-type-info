var ts = require("typescript");
var utils_1 = require("./../utils");
var named_definition_1 = require("./base/named-definition");
var TypeParameterDefinition = (function () {
    function TypeParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillConstraint(typeChecker, symbol);
    }
    TypeParameterDefinition.prototype.fillConstraint = function (typeChecker, symbol) {
        var declaration = this.getTypeDeclaration(typeChecker, symbol);
        if (declaration.constraint != null) {
            this.constraint = typeChecker.getTypeAtLocation(declaration.constraint);
        }
    };
    TypeParameterDefinition.prototype.getTypeDeclaration = function (typeChecker, symbol) {
        return symbol.getDeclarations()[0];
    };
    TypeParameterDefinition.isTypeParameter = function (symbol) {
        return (symbol.getFlags() & 262144) !== 0;
    };
    return TypeParameterDefinition;
})();
exports.TypeParameterDefinition = TypeParameterDefinition;
utils_1.applyMixins(TypeParameterDefinition, [named_definition_1.NamedDefinition]);
