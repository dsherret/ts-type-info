var utils_1 = require("./../../utils");
var decorated_definition_1 = require("./decorated-definition");
var named_definition_1 = require("./named-definition");
var parametered_definition_1 = require("./parametered-definition");
var return_typed_definition_1 = require("./return-typed-definition");
var scoped_definition_1 = require("./scoped-definition");
var BaseMethodDefinition = (function () {
    function BaseMethodDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
        this.fillParametersBySymbol(typeChecker, symbol);
        this.fillReturnTypeBySymbol(typeChecker, symbol);
    }
    return BaseMethodDefinition;
})();
exports.BaseMethodDefinition = BaseMethodDefinition;
utils_1.applyMixins(BaseMethodDefinition, [named_definition_1.NamedDefinition, decorated_definition_1.DecoratedDefinition, parametered_definition_1.ParameteredDefinition, return_typed_definition_1.ReturnTypedDefinition, scoped_definition_1.ScopedDefinition]);

//# sourceMappingURL=base-method-definition.js.map
