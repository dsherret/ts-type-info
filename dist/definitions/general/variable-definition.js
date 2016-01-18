var utils_1 = require("./../../utils");
var named_definition_1 = require("./../base/named-definition");
var type_expressioned_definition_1 = require("./../base/type-expressioned-definition");
var exportable_definition_1 = require("./../base/exportable-definition");
var default_expressioned_definition_1 = require("./../base/default-expressioned-definition");
var VariableDefinition = (function () {
    function VariableDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }
    return VariableDefinition;
})();
exports.VariableDefinition = VariableDefinition;
utils_1.applyMixins(VariableDefinition, [named_definition_1.NamedDefinition, exportable_definition_1.ExportableDefinition, type_expressioned_definition_1.TypeExpressionedDefinition, default_expressioned_definition_1.DefaultExpressionedDefinition]);

//# sourceMappingURL=variable-definition.js.map
