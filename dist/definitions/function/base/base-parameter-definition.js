var utils_1 = require("./../../../utils");
var base_1 = require("./../../base");
var BaseParameterDefinition = (function () {
    function BaseParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }
    BaseParameterDefinition.prototype.fillParameterDetails = function (typeChecker, symbol) {
        var declaration = typeChecker.getDeclarationFromSymbol(symbol);
        this.isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this.isRestParameter = declaration.dotDotDotToken != null;
    };
    return BaseParameterDefinition;
})();
exports.BaseParameterDefinition = BaseParameterDefinition;
utils_1.applyMixins(BaseParameterDefinition, [base_1.NamedDefinition, base_1.TypeExpressionedDefinition, base_1.DefaultExpressionedDefinition]);

//# sourceMappingURL=base-parameter-definition.js.map
