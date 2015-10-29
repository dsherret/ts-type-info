var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var TypeParameterDefinition = (function (_super) {
    __extends(TypeParameterDefinition, _super);
    function TypeParameterDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this.setConstraint(typeChecker, symbol);
    }
    TypeParameterDefinition.prototype.setConstraint = function (typeChecker, symbol) {
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
})(definitions_1.NamedDefinition);
exports.TypeParameterDefinition = TypeParameterDefinition;
