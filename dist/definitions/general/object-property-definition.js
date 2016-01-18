var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("./../../utils");
var default_expressioned_definition_1 = require("./../base/default-expressioned-definition");
var base_property_definition_1 = require("./../base/base-property-definition");
var ObjectPropertyDefinition = (function (_super) {
    __extends(ObjectPropertyDefinition, _super);
    function ObjectPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }
    return ObjectPropertyDefinition;
})(base_property_definition_1.BasePropertyDefinition);
exports.ObjectPropertyDefinition = ObjectPropertyDefinition;
utils_1.applyMixins(ObjectPropertyDefinition, [default_expressioned_definition_1.DefaultExpressionedDefinition]);

//# sourceMappingURL=object-property-definition.js.map
