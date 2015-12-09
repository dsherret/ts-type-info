var utils_1 = require("./../../../utils");
var named_definition_1 = require("./../../base/named-definition");
var parametered_definition_1 = require("./../../function/base/parametered-definition");
var return_typed_definition_1 = require("./../../function/base/return-typed-definition");
var BaseFunctionDefinition = (function () {
    function BaseFunctionDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillParametersBySymbol(typeChecker, symbol);
        this.fillReturnTypeBySymbol(typeChecker, symbol);
    }
    return BaseFunctionDefinition;
})();
exports.BaseFunctionDefinition = BaseFunctionDefinition;
utils_1.applyMixins(BaseFunctionDefinition, [named_definition_1.NamedDefinition, parametered_definition_1.ParameteredDefinition, return_typed_definition_1.ReturnTypedDefinition]);

//# sourceMappingURL=base-function-definition.js.map
