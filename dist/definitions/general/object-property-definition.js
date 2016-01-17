var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
var base_property_definition_1 = require("./../base/base-property-definition");
var expressions_1 = require("./../../expressions");
var ObjectPropertyDefinition = (function (_super) {
    __extends(ObjectPropertyDefinition, _super);
    function ObjectPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }
    ObjectPropertyDefinition.prototype.fillDefaultExpression = function (typeChecker, symbol) {
        var declaration = typeChecker.getDeclarationFromSymbol(symbol);
        this.defaultExpression = declaration.initializer != null ? new expressions_1.Expression(typeChecker, declaration.initializer) : null;
    };
    return ObjectPropertyDefinition;
})(base_property_definition_1.BasePropertyDefinition);
exports.ObjectPropertyDefinition = ObjectPropertyDefinition;

//# sourceMappingURL=object-property-definition.js.map
