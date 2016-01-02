var utils_1 = require("./../../../utils");
var base_1 = require("./../../base");
var parametered_definition_1 = require("./parametered-definition");
var return_typed_definition_1 = require("./return-typed-definition");
var misc_1 = require("./../../misc");
var BaseFunctionDefinition = (function () {
    function BaseFunctionDefinition(parameterDefinition, typeChecker, symbol) {
        this._typeParameters = [];
        this.fillName(symbol);
        this.fillParametersBySymbol(parameterDefinition, typeChecker, symbol);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParameters(typeChecker, symbol);
    }
    Object.defineProperty(BaseFunctionDefinition.prototype, "typeParameters", {
        get: function () {
            return this._typeParameters;
        },
        enumerable: true,
        configurable: true
    });
    BaseFunctionDefinition.prototype.fillTypeParameters = function (typeChecker, symbol) {
        this._typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(function (s) { return new misc_1.TypeParameterDefinition(typeChecker, s); });
    };
    return BaseFunctionDefinition;
})();
exports.BaseFunctionDefinition = BaseFunctionDefinition;
utils_1.applyMixins(BaseFunctionDefinition, [base_1.NamedDefinition, parametered_definition_1.ParameteredDefinition, return_typed_definition_1.ReturnTypedDefinition]);

//# sourceMappingURL=base-function-definition.js.map
