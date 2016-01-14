var utils_1 = require("./../../../utils");
var base_1 = require("./../../base");
var parametered_definition_1 = require("./parametered-definition");
var return_typed_definition_1 = require("./return-typed-definition");
var BaseFunctionDefinition = (function () {
    function BaseFunctionDefinition(parameterDefinition, typeChecker, symbol) {
        this.fillName(symbol);
        this.fillParametersBySymbol(parameterDefinition, typeChecker, symbol);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParametersBySymbol(typeChecker, symbol);
    }
    return BaseFunctionDefinition;
})();
exports.BaseFunctionDefinition = BaseFunctionDefinition;
utils_1.applyMixins(BaseFunctionDefinition, [base_1.NamedDefinition, base_1.TypeParameteredDefinition, parametered_definition_1.ParameteredDefinition, return_typed_definition_1.ReturnTypedDefinition]);

//# sourceMappingURL=base-function-definition.js.map
